import type { MDXComponents } from 'mdx/types';
import { A as a } from "./src/app/components/a";
import { P as p } from "./src/app/components/p";
import { H1 as h1 } from "./src/app/components/h1";
import { H2 as h2 } from "./src/app/components/h2";
import { H3 as h3 } from "./src/app/components/h3";
import { OL as ol } from "./src/app/components/ol";
import { UL as ul } from "./src/app/components/ul";
import { LI as li } from "./src/app/components/li";
import { HR as hr } from "./src/app/components/hr";
import { Code as code } from "./src/app/components/code";
import { Tweet } from "./src/app/components/tweet";
import { Image } from "./src/app/components/image";
import { Figure } from "./src/app/components/figure";
import { Snippet } from "./src/app/components/snippet";
import { Caption } from "./src/app/components/caption";
import { Callout } from "./src/app/components/callout";
import { YouTube } from "./src/app/components/youtube";
import { Ref, FootNotes, FootNote } from "./src/app/components/footnotes";
import { Blockquote as blockquote } from "./src/app/components/blockquote";

export function useMDXComponents(components: {
  [component: string]: React.ComponentType;
}) {
  return {
    ...components,
    a,
    h1,
    h2,
    h3,
    p,
    ol,
    ul,
    li,
    hr,
    code,
    pre: Snippet,
    img: Image,
    blockquote,
    Tweet,
    Image,
    Figure,
    Snippet,
    Caption,
    Callout,
    YouTube,
    Ref,
    FootNotes,
    FootNote,
  };
}
