import { ConverterOptions, ShowdownExtensions } from "showdown";
import { Plugin } from "rollup";

/** Options passed to the Markdown Rollup plugin. */
interface MarkdownPluginOptions {
  /**
   * A glob to limit which Markdown file(s) the plugin includes.
   * 
   * @example "src/md/*.md"
   * @default ""
   * 
   */
  include?: string;

  /**
   * A glob to limit which Markdown file(s) the plugin excludes.
   * 
   * @example "README.md"
   * @default ""
   * 
   */
  exclude?: string;

  /**
   * An object of options to pass to the Showdown converter.
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
   * @defualt { }
   * 
   */
  showdownOptions?: ConverterOptions;

  /**
   * A dictionary of extensions for the Showdown converter to use.
   * 
   * @example
   * 
   * ```ts
   * import markdown from 'rollup-plugin-markdown'
   * 
   * markdown({
   *   showdownExtensions: {
   *     "Markdown to Showdown": {
   *       type: 'lang',
   *       regex: /markdown/g,
   *       replace: 'showdown'
   *     }
   *   }
   * })
   * ```
   * 
   * @defualt { }
   * 
   */
  showdownExtensions?: ShowdownExtensions;

  /**
   * Whether or not to export the included Markdown file(s) as JavaScript modules.
   * If false, passed parsed Markdown as HTML thorugh the Rollup build process.
   * 
   * @default true
   * 
   */
  allowImports: boolean;

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
  parseFrontMatterAsMarkdown: boolean;
}

/** The available metadata exported with a given Markdown file. */
interface MarkdownModuleMetadata {
  /** A JS object of the parsed Markdown front-matter. */
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

/** The exported parsed HTML and metadata for a given Markdown file. */
interface MarkdownModuleExport extends MarkdownModuleMetadata {
  /** The output HTML from the parsed Markdown. */
  html: string;
}

/**
 * A Rollup plugin that converts Markdown to HTML using Showdown.
 * 
 * @param options Options passed to the Markdown Rollup plugin.
 * @see https://github.com/tommy-mitchell/rollup-plugin-markdown
 */
export default function markdownPlugin(options?: MarkdownPluginOptions): Plugin;
