import type { BundledLanguage, BundledTheme, ThemeRegistration } from 'shiki';

/** 
 * Languages for syntax highlighting.
 * @see https://shiki.style/languages
 */

// `string & {}` allows any string while preserving 
// union with other types for autocomplete
type Language =
  BundledLanguage
  | "plaintext"
  | (string & {})
  | undefined;

/**
 * A textmate theme object or a Shiki BundledTheme
 * @see https://shiki.style/themes
 */
type Theme = ThemeRegistration | BundledTheme;

/**
 * Configuration options for the syntax highlighter
 */
type HighlighterOptions = {
  /** 
   * Minimum time (in milliseconds) between highlight operations. 
   * Defaults to undefined (no throttling)
   */
  throttleMs?: number;
};

/**
 * State for the throttling logic
 */
type ThrottleState = {
  /** 
   * Timestamp of the last highlight operation in milliseconds 
   * */
  lastHighlightTime: number;
};

export type { Language, Theme, HighlighterOptions, ThrottleState };
