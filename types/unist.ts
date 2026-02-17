import type { Node } from "unist";
export interface UnistNode extends Node {
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
  name?: string;
  properties?: {
    __rawString__?: string;
    __className__?: string;
    __event__?: string;
    [key: string]: unknown;
  } & NpmCommands;
  tagName?: string;
  type: string;
  value?: string;
}

export interface UnistTree extends UnistNode {
  children: UnistNode[];
}

export interface NpmCommands {
  __bunCommand__?: string;
  __npmCommand__?: string;
  __pnpmCommand__?: string;
  __yarnCommand__?: string;
}
