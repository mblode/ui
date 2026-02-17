import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { createHighlighter } from "shiki";
import { visit } from "unist-util-visit";
import { z } from "zod";

import { rehypeComponent } from "./lib/rehype-component";
import { rehypeNpmCommand } from "./lib/rehype-npm-command";

const EVENT_META_REGEX = /event="([^"]*)"/;
const INDEX_PATH_SUFFIX_REGEX = /\/index$/;
const WINDOWS_PATH_SEPARATOR_REGEX = /\\/g;

const prettyCodeOptions: Options = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  grid: false,
  keepBackground: false,
  getHighlighter: (options) =>
    createHighlighter({
      ...options,
    }),
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
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedChars(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className = ["word--highlighted"];
  },
};

const pages = defineCollection({
  name: "Page",
  directory: "content/pages",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [codeImport, remarkGfm],
    });
    return {
      ...document,
      slug: `/${document._meta.path}`,
      slugAsParams: document._meta.path,
      body: {
        raw: document.content,
        code: body,
      },
    };
  },
});

const documents = defineCollection({
  name: "Doc",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    published: z.boolean().default(true),
    date: z.string().optional(),
    links: z
      .object({
        doc: z.string().optional(),
        api: z.string().optional(),
      })
      .optional(),
    featured: z.boolean().optional().default(false),
    component: z.boolean().optional().default(false),
    toc: z.boolean().optional().default(true),
    image: z.string().optional(),
  }),
  transform: async (document, context) => {
    const slugAsParams = document._meta.path
      .replace(WINDOWS_PATH_SEPARATOR_REGEX, "/")
      .replace(INDEX_PATH_SUFFIX_REGEX, "");
    const body = await compileMDX(context, document, {
      remarkPlugins: [codeImport, remarkGfm],
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
                  codeEl.data.meta = codeEl.data.meta.replace(
                    EVENT_META_REGEX,
                    ""
                  );
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

              preElement.properties.__withMeta__ =
                node.children.at(0).tagName === "div";
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
              if (
                codeElement?.type === "element" &&
                codeElement?.tagName === "code"
              ) {
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
                      lineElement.properties.className = [
                        lineElement.properties.className,
                        "line",
                      ];
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
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
      ],
    });
    return {
      ...document,
      image: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURI(
        document.title
      )}&description=${encodeURI(document.description)}`,
      slug: `/docs/${slugAsParams}`,
      slugAsParams,
      body: {
        raw: document.content,
        code: body,
      },
    };
  },
});

export default defineConfig({
  content: [documents, pages],
});
