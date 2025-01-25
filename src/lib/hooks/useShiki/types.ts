import type { BundledLanguage } from 'shiki';

type HexColor = string;

// Language can only be a BundledLanguage or plaintext, we define string to suppor
type Language = BundledLanguage | string | undefined | { id: string };

// TODO: Add support for multiple themes
type CustomTheme = {
  name: string;
  displayName: string;
  colors: Record<string, HexColor>;
  tokenColors: {
    scope: string | string[];
    settings: {
      fontStyle?: string;
      foreground?: HexColor;
    };
  }[];
};

type HighlighterOptions = {
  throttleMs?: number;
};

type ThrottleState = {
  lastHighlightTime: number;
};

export type { CustomTheme, Language, HighlighterOptions, ThrottleState };
