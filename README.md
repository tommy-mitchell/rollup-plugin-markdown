# rollup-plugin-markdown

A Rollup plugin to parse Markdown files. The parsed Markdown can either be imported as a JavaScript module, or piped through the Rollup build process.

- [Showdown][showdown] is used to parse the Markdown file.
- [Gray Matter][gray-matter] is used to parse front-matter from the Markdown file.

## Install

```text
npm install --save-dev github:tommy-mitchell/rollup-plugin-markdown
```

## Example Module Output

```js
import blogPost from './src/blog-post.md'

// from this import you get:
blogPost.html // the parsed HTML
blogPost.metadata // a JS object of the front-matter
blogPost.filename // the filename that was imported ('blog-post.md')
blogPost.path // the path to the file that was imported ('./src/blog-post.md')
```

## Rollup Configuration

```js
import markdown from '@tommy-mitchell/rollup-plugin-markdown'
import 'showdown-twitter'

export default {
  input: 'your-app.js',
  plugins: [
    markdown({
      include: 'src/md/*.md',
      exclude: 'README.md',
      showdownOptions: {
        ghMentions: false,
      },
      showdownExtensions: [
        {
          name: 'Markdown to Showdown',
          type: 'lang',
          regex: /markdown/g,
          replace: 'showdown',
        },
        'twitter',
      ],
      exportAsModule: true, // default
      parseFrontMatterAsMarkdown: false, // default
    }),
  ],
}
```

You can pass in six options:

- `include` and `exclude`, which are globs to limit which file(s) the plugin is applied to.
- `showdownOptions`, which are [options][sd-opts] to pass to the Showdown converter.
- `showdownExtensions`, which is an array of either [Showdown extensions][sd-exts] or names of [globally-registered][sd-global] Showdown extensions.
- `exportAsModule`, which is a flag to tell the plugin whether or not to export the Markdown files as JavaScript modules.
- `parseFrontMatterAsMarkdown`, which is a flag to tell the plugin to convert front-matter values into inline HTML (without enclosing `<p></p>` tags).

The plugin will only parse `.md` files.

[showdown]: https://github.com/showdownjs/showdown
[gray-matter]: https://github.com/jonschlinkert/gray-matter
[sd-opts]: https://showdownjs.com/docs/available-options/
[sd-exts]: https://showdownjs.com/docs/extensions/
[sd-global]: https://showdownjs.com/docs/create-extension/#implementation-concerns

## Changelog

#### 0.6.0 [August 2022]

- Fix Showdown extension logic. `options.showdownExtensions` is now an array that accepts extension implementations or extension names. (See [above](#rollup-configuration).)

#### 0.5.2 [August 2022]

- Rename `allowImports` to `exportAsModule`, update to `@rollup/pluginutils`.

#### 0.5.1 [August 2022]

- Fix inconsistencies/typos.

#### 0.5.0 [July 2022]

- Pass module info as meta-data in Rollup, pass showdownExtensions as a dictionary, add type definitions.

#### 0.4.0 [June 2022]

- Update Showdown, allow for Rollup transform piping, and add front-matter Markdown parsing.

#### 0.3.0 [13th Jan 2021]

- Allow Showdown options and extensions to be registered. Thanks to @mattfran and @arnorhs for their contributions.

#### 0.2.0

- Expose full path to Markdown file as `.path` from the import.

#### 0.1.0

- Initial release.
