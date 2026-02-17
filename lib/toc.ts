import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";

const textTypes = new Set(["text", "emphasis", "strong", "inlineCode"]);

interface MdastLikeNode {
  children?: MdastLikeNode[];
  map?: MdastLikeNode;
  type?: string;
  url?: string;
  value?: string;
}

interface Item {
  items?: Item[];
  title?: string;
  url?: string;
}

interface Items {
  items?: Item[];
}

function toNode(value: unknown): MdastLikeNode | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  return value as MdastLikeNode;
}

function flattenNode(node: MdastLikeNode) {
  const parts: string[] = [];

  visit(node as never, (currentNode: MdastLikeNode) => {
    if (!(currentNode.type && textTypes.has(currentNode.type))) {
      return;
    }

    if (typeof currentNode.value === "string") {
      parts.push(currentNode.value);
    }
  });

  return parts.join("");
}

function getItems(node: MdastLikeNode | null, current: Item): Item {
  if (!node) {
    return {};
  }

  if (node.type === "paragraph") {
    visit(node as never, (childNode: MdastLikeNode) => {
      if (childNode.type === "link" && typeof childNode.url === "string") {
        current.url = childNode.url;
        current.title = flattenNode(node);
      }

      if (childNode.type === "text") {
        current.title = flattenNode(node);
      }
    });

    return current;
  }

  if (node.type === "list") {
    current.items = (node.children ?? []).map((childNode) =>
      getItems(childNode, {})
    );
    return current;
  }

  if (node.type === "listItem") {
    const [firstChild, secondChild] = node.children ?? [];
    const heading = getItems(firstChild ?? null, {});

    if (secondChild) {
      getItems(secondChild, heading);
    }

    return heading;
  }

  return {};
}

const getToc = () => (node: unknown, file: { data?: unknown }) => {
  const table = toc(node as never) as { map?: unknown };
  file.data = getItems(toNode(table.map), {});
};

export type TableOfContents = Items;

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content);

  return result.data as TableOfContents;
}
