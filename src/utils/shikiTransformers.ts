import type { Element } from 'hast';

export const removeTabIndexFromPre = {
  pre(node: Element) {
    node.properties.tabindex = '-1';
  },
};
