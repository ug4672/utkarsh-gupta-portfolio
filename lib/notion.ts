const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

export type TravelPost = {
  id: string;
  slug: string;
  title: string;
  location: string;
  date: string | null;
  summary: string;
  cover: string | null;
};

export type TravelPostFull = TravelPost & {
  markdown: string;
};

type RichText = { plain_text?: string };

function creds() {
  const token = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_TRAVEL_DB_ID;
  if (!token || !dbId) return null;
  return { token, dbId };
}

async function notionFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.NOTION_API_KEY!;
  const res = await fetch(`${NOTION_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion ${path} → ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

function plain(rt: RichText[] | undefined): string {
  if (!Array.isArray(rt)) return "";
  return rt.map((t) => t.plain_text ?? "").join("");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function coverUrl(cover: unknown): string | null {
  if (!cover || typeof cover !== "object") return null;
  const c = cover as {
    type?: string;
    external?: { url?: string };
    file?: { url?: string };
  };
  if (c.type === "external") return c.external?.url ?? null;
  if (c.type === "file") return c.file?.url ?? null;
  return null;
}

type NotionPage = {
  id: string;
  cover: unknown;
  properties: Record<string, unknown>;
};

function pageToPost(page: NotionPage): TravelPost | null {
  const props = page.properties;
  const titleProp =
    (props.Title as { title?: RichText[] })?.title ??
    (props.Name as { title?: RichText[] })?.title;
  const title = plain(titleProp);
  if (!title) return null;

  const slugProp = plain(
    (props.Slug as { rich_text?: RichText[] })?.rich_text
  );
  const location = plain(
    (props.Location as { rich_text?: RichText[] })?.rich_text
  );
  const summary = plain(
    (props.Summary as { rich_text?: RichText[] })?.rich_text
  );
  const date =
    (props.Date as { date?: { start?: string } })?.date?.start ?? null;

  return {
    id: page.id,
    slug: slugProp || slugify(title),
    title,
    location,
    date,
    summary,
    cover: coverUrl(page.cover),
  };
}

export async function getPosts(): Promise<TravelPost[]> {
  const c = creds();
  if (!c) return [];
  try {
    const data = await notionFetch<{ results: NotionPage[] }>(
      `/databases/${c.dbId}/query`,
      {
        method: "POST",
        body: JSON.stringify({
          filter: {
            property: "Published",
            checkbox: { equals: true },
          },
          sorts: [{ property: "Date", direction: "descending" }],
          page_size: 100,
        }),
      }
    );
    return data.results
      .map(pageToPost)
      .filter((p): p is TravelPost => p !== null);
  } catch (err) {
    console.error("Notion getPosts failed:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<TravelPostFull | null> {
  const c = creds();
  if (!c) return null;
  try {
    const posts = await getPosts();
    const meta = posts.find((p) => p.slug === slug);
    if (!meta) return null;

    const blocks = await fetchAllBlocks(meta.id);
    const markdown = blocksToMarkdown(blocks);

    return { ...meta, markdown };
  } catch (err) {
    console.error("Notion getPostBySlug failed:", err);
    return null;
  }
}

type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  children?: NotionBlock[];
  [key: string]: unknown;
};

async function fetchAllBlocks(blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined = undefined;
  do {
    const qs: string = cursor
      ? `?start_cursor=${cursor}&page_size=100`
      : "?page_size=100";
    const data: {
      results: NotionBlock[];
      next_cursor: string | null;
      has_more: boolean;
    } = await notionFetch(`/blocks/${blockId}/children${qs}`);
    for (const b of data.results) {
      if (b.has_children && b.type !== "child_page") {
        b.children = await fetchAllBlocks(b.id);
      }
      blocks.push(b);
    }
    cursor = data.has_more && data.next_cursor ? data.next_cursor : undefined;
  } while (cursor);
  return blocks;
}

function rtToMd(rt: RichText[] | undefined): string {
  if (!Array.isArray(rt)) return "";
  return rt
    .map((t) => {
      const annotated = t as RichText & {
        annotations?: { bold?: boolean; italic?: boolean; code?: boolean };
        href?: string | null;
      };
      let text = annotated.plain_text ?? "";
      if (annotated.annotations?.code) text = `\`${text}\``;
      if (annotated.annotations?.bold) text = `**${text}**`;
      if (annotated.annotations?.italic) text = `*${text}*`;
      if (annotated.href) text = `[${text}](${annotated.href})`;
      return text;
    })
    .join("");
}

function blocksToMarkdown(blocks: NotionBlock[], depth = 0): string {
  const lines: string[] = [];
  const indent = "  ".repeat(depth);
  for (const b of blocks) {
    switch (b.type) {
      case "paragraph": {
        const t = rtToMd((b.paragraph as { rich_text?: RichText[] })?.rich_text);
        lines.push(`${indent}${t}`);
        break;
      }
      case "heading_1": {
        const t = rtToMd((b.heading_1 as { rich_text?: RichText[] })?.rich_text);
        lines.push(`${indent}# ${t}`);
        break;
      }
      case "heading_2": {
        const t = rtToMd((b.heading_2 as { rich_text?: RichText[] })?.rich_text);
        lines.push(`${indent}## ${t}`);
        break;
      }
      case "heading_3": {
        const t = rtToMd((b.heading_3 as { rich_text?: RichText[] })?.rich_text);
        lines.push(`${indent}### ${t}`);
        break;
      }
      case "bulleted_list_item": {
        const t = rtToMd(
          (b.bulleted_list_item as { rich_text?: RichText[] })?.rich_text
        );
        lines.push(`${indent}- ${t}`);
        break;
      }
      case "numbered_list_item": {
        const t = rtToMd(
          (b.numbered_list_item as { rich_text?: RichText[] })?.rich_text
        );
        lines.push(`${indent}1. ${t}`);
        break;
      }
      case "quote": {
        const t = rtToMd((b.quote as { rich_text?: RichText[] })?.rich_text);
        lines.push(`${indent}> ${t}`);
        break;
      }
      case "code": {
        const t = rtToMd((b.code as { rich_text?: RichText[] })?.rich_text);
        const lang = (b.code as { language?: string })?.language ?? "";
        lines.push(`${indent}\`\`\`${lang}\n${t}\n\`\`\``);
        break;
      }
      case "image": {
        const img = b.image as {
          type?: string;
          external?: { url?: string };
          file?: { url?: string };
          caption?: RichText[];
        };
        const url =
          img?.type === "external"
            ? img?.external?.url
            : img?.file?.url;
        const caption = rtToMd(img?.caption);
        if (url) lines.push(`${indent}![${caption}](${url})`);
        break;
      }
      case "divider":
        lines.push(`${indent}---`);
        break;
      case "callout": {
        const t = rtToMd(
          (b.callout as { rich_text?: RichText[] })?.rich_text
        );
        lines.push(`${indent}> ${t}`);
        break;
      }
      default:
        break;
    }
    if (b.children && b.children.length > 0) {
      lines.push(blocksToMarkdown(b.children, depth + 1));
    }
    lines.push("");
  }
  return lines.join("\n");
}

export function isConfigured(): boolean {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_TRAVEL_DB_ID);
}
