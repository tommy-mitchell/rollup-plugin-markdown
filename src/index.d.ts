import { ConverterOptions, ShowdownExtension } from 'showdown'
import { Plugin } from 'rollup'
import { FilterPattern } from '@rollup/pluginutils'

/** A custom Showdown extension implementation. */
interface NamedShowdownExtension extends ShowdownExtension {
  /** The name of the custom Showdown extension. */
  name: string
}

/** Options passed to the Markdown Rollup plugin. */
interface MarkdownPluginOptions {
  /**
   * A glob to limit which Markdown file(s) the plugin includes.
   * 
   * @example 'src/md/*.md'
   * @default all
   * 
   */
  include?: FilterPattern

  /**
   * A glob to limit which Markdown file(s) the plugin excludes.
   * 
   * @example 'README.md'
   * @default none
   * 
   */
  exclude?: FilterPattern

  /**
   * An object of options to pass to the Showdown converter.
   * 
   * @example
   * 
   * ```ts
   * markdown({
   *   showdownOptions: {
   *     ghMentions: false,
   *   },
   * })
   * ```
   * 
   * @default {}
   * 
   */
  showdownOptions?: ConverterOptions

  /**
   * An array of extensions for the Showdown converter to use. An extension can
   * either be a string corresponding to the name of a globally-registered
   * Showdown extension, or an object representing a Showdown extension with a
   * `name` property.
   * 
   * @see https://showdownjs.com/docs/extensions/
   * 
   * @example
   * 
   * ```ts
   * require('showdown-twitter')
   * 
   * markdown({
   *   showdownExtensions: [
   *     {
   *       name: 'Markdown to Showdown',
   *       type: 'lang',
   *       regex: /markdown/g,
   *       replace: 'showdown',
   *     },
   *     'twitter',
   *   ],
   * })
   * ```
   * 
   * @default []
   * 
   */
   showdownExtensions?: (NamedShowdownExtension | string)[]

  /**
   * Whether or not to export the included Markdown file(s) as JavaScript modules.
   * If false, passes parsed Markdown as HTML through the Rollup build process.
   * 
   * @default true
   * 
   */
   exportAsModule?: boolean

  /**
   * Whether or not to parse a given included Markdown file's front-matter
   * through the Markdown converter. If `true`, the front-matter values are
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
   * **parseFrontMatterAsMarkdown** = `false`:
   *
   * ```ts
   * {
   *   name: 'My name is *John Doe*.'
   * }
   * ```
   * 
   * **parseFrontMatterAsMarkdown** = `true`:
   *
   * ```ts
   * {
   *   name: 'My name is <em>John Doe</em>.'
   * }
   * ```
   * 
   * @default false
   * 
   */
  parseFrontMatterAsMarkdown?: boolean
}

/** The available metadata exported with a given Markdown file. */
interface MarkdownModuleMetadata {
  /** A JS object of the parsed Markdown front-matter. */
  metadata: {
    [key: string]: any
  }

  /**
   * The name of the parsed Markdown file.
   * 
   * @example 'blog-post.md'
   * 
   */
  filename: string

  /**
   * The absolute path to the parsed Markdown file.
   * 
   * @example '~/src/blog-post.md'
   * 
   */
  path: string
}

/** The exported parsed HTML and metadata for a given Markdown file. */
interface MarkdownModuleExport extends MarkdownModuleMetadata {
  /** The output HTML from the parsed Markdown. */
  html: string
}

/**
 * A Rollup plugin that converts Markdown to HTML using Showdown.
 * 
 * @param options Options passed to the Markdown Rollup plugin.
 * @see https://github.com/tommy-mitchell/rollup-plugin-markdown
 */
export default function markdownPlugin(options?: MarkdownPluginOptions): Plugin
