import type { Element, Root, Parent } from 'hast';
import { visit } from 'unist-util-visit';

export const isInlineCode = (node: Element): boolean => {
  return node.position?.start.line === node.position?.end.line;
};


export function rehypeInlineCodeProperty() {
  return function (tree: Root) {
    visit(tree as any, 'element', function (node: Element, _index, parent: Parent | null) {
      if (node.tagName === 'code') {
        // Ensure properties exist
        node.properties = node.properties || {};

        // Check if the parent is a pre tag
        const isInPre = parent && 'tagName' in parent && parent.tagName === 'pre';

        // Set inline property
        node.properties.inline = !isInPre;

        console.log('Processing code node:', {
          parentTag: isInPre ? 'pre' : parent?.type,
          inline: node.properties.inline
        });
      }
    });
  }
}
