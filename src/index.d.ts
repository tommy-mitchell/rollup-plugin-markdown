import { ConverterOptions, ShowdownExtension } from "showdown";
import { FilterPattern } from '@rollup/pluginutils';
import { Plugin } from "rollup";

/** Options passed to the Markdown Rollup plugin. */
export interface RollupMarkdownPluginOptions {
  /**
   * A glob to limit which Markdown file(s) the plugin includes.
   * 
   * @example "src/md/*.md"
   * @default All .md files.
   * 
   */
  include?: FilterPattern;

  /**
   * A glob to limit which Markdown file(s) the plugin excludes.
   * 
   * @example "README.md"
   * @default No exclusions.
   * 
   */
  exclude?: FilterPattern;

  /**
   * An object of options to pass to the Showdown converter.
   * 
   * @note in order to parse front-matter, `metadata` is always set to `true`.
   * 
   * @example
   * 
   * ```ts
   * import markdown from 'rollup-plugin-markdown'
   * 
   * markdown({
   *   showdownOptions: {
   *     ghMentions: false
   *   }
   * })
   * ```
   * 
   * @default {}
   * 
   */
  showdownOptions?: ConverterOptions;

  /**
   * An array of extensions for the Showdown converter to use.
   * 
   * @example
   * 
   * ```ts
   * import markdown from 'rollup-plugin-markdown'
   * import example from './example-extension'
   * 
   * markdown({
   *   showdownExtensions: [example],
   *   showdownOptions: { extensions: ['example'] }
   * })
   * ```
   * 
   * @default []
   * 
   */
  showdownExtensions?: ShowdownExtension[];

  /**
   * Whether or not to export the included Markdown file(s) as JavaScript modules.
   * If false, passed parsed Markdown as HTML thorugh the Rollup build process.
   * 
   * @default true
   * 
   */
  allowImports?: boolean;

  /**
   * Whether or not to parse the a given included Markdown file's front-matter
   * through the Markdown converter. If true, the front-matter values are
   * converted to inline HTML (e.g., without enclosing `<p></p>` tags).
   * 
   * @example
   * 
   * **input**:
   * 
   * ```md
   * ---
   * name: My name is *John Doe*.
   * ---
   * ```
   * 
   * **parseFrontMatterAsMarkdown** = false:
   *
   * ```ts
   * {
   *   name: "My name is *John Doe*." 
   * }
   * ```
   * 
   * **parseFrontMatterAsMarkdown** = true:
   *
   * ```ts
   * {
   *   name: "My name is <em>John Doe</em>." 
   * }
   * ```
   * 
   * @default false
   * 
   */
  parseFrontMatterAsMarkdown?: boolean;
}

/** The exported parsed HTML and metadata for a given Markdown file. */
export interface MarkdownModule {
  /** The output HTML from the parsed Markdown. */
  html: string;

  /**
   * A JS object of the parsed Markdown front-matter
   * 
   * @example
   * 
   * **input**:
   * 
   * ```md
   * ---
   * name: John Doe
   * ---
   * ```
   * 
   * **output**:
   * 
   * ```ts
   * {
   *   name: "John Doe"
   * }
   * ```
   * 
   */
  metadata: {
    [key: string]: any;
  };

  /**
   * The name of the parsed Markdown file.
   * 
   * @example "blog-post.md"
   * 
   */
  filename: string;

  /**
   * The absolute path to the parsed Markdown file.
   * 
   * @example "~/src/blog-post.md"
   * 
   */
  path: string;
}

/**
 * A Rollup plugin that converts Markdown to HTML using Showdown.
 * 
 * @param options Options passed to the Markdown Rollup plugin.
 * @see https://github.com/tommy-mitchell/rollup-plugin-markdown
 */
export function markdownPlugin(options?: RollupMarkdownPluginOptions): Plugin;
export default markdownPlugin;
