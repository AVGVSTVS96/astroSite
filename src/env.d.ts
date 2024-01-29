/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'remark-sectionize' {
  import { Node } from 'unist';

  type Transformer = (tree: Node) => void;

  interface Plugin {
    (): Transformer;
  }

  const remarkSectionize: Plugin;

  export default remarkSectionize;
}
