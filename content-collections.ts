import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { createHighlighter } from "shiki";
import { visit } from "unist-util-visit";
import { z } from "zod";

import { rehypeComponent } from "./lib/rehype-component";
import { rehypeNpmCommand } from "./lib/rehype-npm-command";

const EVENT_META_REGEX = /event="([^"]*)"/;
const INDEX_PATH_SUFFIX_REGEX = /(?:^|\/)index$/;
const WINDOWS_PATH_SEPARATOR_REGEX = /\\/g;

const prettyCodeOptions: Options = {
  getHighlighter: (options) =>
    createHighlighter({
      ...options,
    }),
  grid: false,
  keepBackground: false,
  onVisitHighlightedChars(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className = ["word--highlighted"];
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push("line--highlighted");
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }

    if (!node.properties.className) {
      node.properties.className = [];
    }

    node.properties.className.push("line");
  },
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
};

const pages = defineCollection({
  directory: "content/pages",
  include: "**/*.mdx",
  name: "Page",
  schema: z.object({
    content: z.string(),
    description: z.string(),
    title: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [codeImport, remarkGfm],
    });
    return {
      ...document,
      body: {
        code: body,
        raw: document.content,
      },
      slug: `/${document._meta.path}`,
      slugAsParams: document._meta.path,
    };
  },
});

const documents = defineCollection({
  directory: "content/docs",
  include: "**/*.mdx",
  name: "Doc",
  schema: z.object({
    component: z.boolean().optional().default(false),
    content: z.string(),
    date: z.string().optional(),
    description: z.string(),
    featured: z.boolean().optional().default(false),
    image: z.string().optional(),
    links: z
      .object({
        api: z.string().optional(),
        doc: z.string().optional(),
      })
      .optional(),
    published: z.boolean().default(true),
    title: z.string(),
    toc: z.boolean().optional().default(true),
  }),
  transform: async (document, context) => {
    const slugAsParams = document._meta.path
      .replace(WINDOWS_PATH_SEPARATOR_REGEX, "/")
      .replace(INDEX_PATH_SUFFIX_REGEX, "");
    const body = await compileMDX(context, document, {
      rehypePlugins: [
        rehypeSlug,
        rehypeComponent,
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children;
              if (codeEl.tagName !== "code") {
                return;
              }
              if (codeEl.data?.meta) {
                // Extract event from meta and pass it down the tree.
                const match = codeEl.data?.meta.match(EVENT_META_REGEX);
                if (match) {
                  node.__event__ = match ? match[1] : null;
                  codeEl.data.meta = codeEl.data.meta.replace(EVENT_META_REGEX, "");
                }
              }
              node.__rawString__ = codeEl.children?.[0].value;
              node.__src__ = node.properties?.__src__;
              node.__style__ = node.properties?.__style__;
            }
          });
        },
        [rehypePrettyCode, prettyCodeOptions],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "figure") {
              if (!("data-rehype-pretty-code-figure" in node.properties)) {
                return;
              }

              const preElement = node.children.at(-1);
              if (preElement.tagName !== "pre") {
                return;
              }

              preElement.properties.__withMeta__ = node.children.at(0).tagName === "div";
              preElement.properties.__rawString__ = node.__rawString__;

              if (node.__src__) {
                preElement.properties.__src__ = node.__src__;
              }

              if (node.__event__) {
                preElement.properties.__event__ = node.__event__;
              }

              if (node.__style__) {
                preElement.properties.__style__ = node.__style__;
              }

              const codeElement = preElement.children?.[0];
              if (codeElement?.type === "element" && codeElement?.tagName === "code") {
                codeElement.properties["data-line-numbers"] = "";
                codeElement.properties["data-theme"] = undefined;
                codeElement.properties.style = undefined;

                for (const lineElement of codeElement.children ?? []) {
                  if (
                    lineElement?.type === "element" &&
                    lineElement?.tagName === "span" &&
                    lineElement?.properties &&
                    "data-line" in lineElement.properties
                  ) {
                    if (!lineElement.properties.className) {
                      lineElement.properties.className = [];
                    }

                    if (Array.isArray(lineElement.properties.className)) {
                      if (!lineElement.properties.className.includes("line")) {
                        lineElement.properties.className.push("line");
                      }
                    } else {
                      lineElement.properties.className = [lineElement.properties.className, "line"];
                    }
                  }
                }
              }
            }
          });
        },
        rehypeNpmCommand,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              ariaLabel: "Link to section",
              className: ["subheading-anchor"],
            },
          },
        ],
      ],
      remarkPlugins: [codeImport, remarkGfm],
    });
    return {
      ...document,
      body: {
        code: body,
        raw: document.content,
      },
      image: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURI(
        document.title,
      )}&description=${encodeURI(document.description)}`,
      slug: slugAsParams ? `/docs/${slugAsParams}` : "/docs",
      slugAsParams,
    };
  },
});

export default defineConfig({
  content: [documents, pages],
});
