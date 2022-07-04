# rollup-plugin-markdown

A Rollup plugin to parse Markdown files. The parsed Markdown can either be imported as a JavaScript module, or piped through the Rollup build process.

- [Showdown][showdown] is used to parse the Markdown
- [Gray Matter][gray-matter] is used to parse front-matter from the Markdown file.

## Install

```text
npm install --save-dev github:tommy-mitchell/rollup-plugin-markdown
```

## Example module output

```js
import blogPost from './src/blog-post.md'

// from this import you get:
blogPost.html // the parsed HTML
blogPost.metadata // a JS object of the front-matter
blogPost.filename // blog-post.md - the filename that was imported
blogPost.path // ./src/blog-post.md - the path to the file that was imported
```

## Rollup configuration

```js
import markdown from '@tommy-mitchell/rollup-plugin-markdown'

export default {
  input: 'your-app.js',
  plugins: [
    markdown({
      include?: 'src/md/*.md',
      exclude?: 'README.md',
      showdownOptions?: {
        ghMentions: false
      },
      showdownExtensions?: {
        "Markdown to Showdown": {
          type: 'lang',
          regex: /markdown/g,
          replace: 'showdown'
        }
      },
      allowImports?: true,
      parseFrontMatterAsMarkdown?: false
    })
  ],
}
```

You can pass in six options:

- `include` and `exclude`, which are globs to limit which file(s) the plugin is applied to.
- `showdownOptions`, which are options to pass to the Showdown converter.
- `showdownExtensions`, which is a dictionary of Showdown extensions.
- `allowImports`, a flag to tell the plugin whether or not to export the Markdown files as JavaScript modules.
- `parseFrontMatterAsMarkdown`, a flag that converts front-matter values into inline HTML (without enclosing `<p>/<p>` tags).

The plugin will only parse `.md` files.

[showdown]: https://github.com/showdownjs/showdown
[gray-matter]: https://github.com/jonschlinkert/gray-matter

## Changelog

#### 0.4.0 [June 2022]

- Update Showdown, allow for Rollup transform piping, and add front-matter Markdown parsing.

#### 0.3.0 [13th Jan 2021]

- Allow Showdown options and extensions to be registered. Thanks to @mattfran and @arnorhs for their contributions.

#### 0.2.0

- expose full path to Markdown file as `.path` from the import.

#### 0.1.0

- Initial release
