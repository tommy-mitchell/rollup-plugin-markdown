const rollup = require('rollup')
const path = require('path')
const Module = require('module')
const markdownPlugin = require('../src/rollup-plugin-markdown')

function requireFromString(code) {
  const opts = {}
  const filename = 'test_require_from_string.js'

  opts.appendPaths = opts.appendPaths || []
  opts.prependPaths = opts.prependPaths || []

  if (typeof code !== 'string') {
    throw new Error('code must be a string, not ' + typeof code)
  }

  var paths = Module._nodeModulePaths(path.dirname(filename))

  var parent = module.parent
  var m = new Module(filename, parent)
  m.filename = filename
  m._compile(code, filename)

  var exports = m.exports
  parent &&
    parent.children &&
    parent.children.splice(parent.children.indexOf(m), 1)

  return exports
}

process.chdir(__dirname)

const bundleFileAndGetCode = async rollupConfig => {
  const bundle = await rollup.rollup(rollupConfig)

  const { output } = await bundle.generate({ format: 'cjs' })

  const [{ code }] = output
  return code
}

const expectedMetadata = {
  layout: 'post',
  title: 'Avoiding recursive useEffect hooks in React',
  intro: 'A short post today about an easy tactic to avoid your <em>useEffect</em> calls becoming recursive when setting state.',
  about: [
    {
      author: 'John Doe',
    },
    {
      keywords: ['React', 'useEffect', 'recursion'],
    },
  ],
}
const expectedFilename = 'test.md'
const expectedPath = path.resolve(path.join(__dirname, 'fixtures/test.md'))

it('returns a module for the markdown file', async () => {
  const code = await bundleFileAndGetCode({
    input: 'fixtures/test.md',
    plugins: [
      markdownPlugin({
        parseFrontMatterAsMarkdown: true,
      }),
    ],
  })

  const requiredModule = requireFromString(code)

  expect(requiredModule.html).toMatchSnapshot()
  expect(requiredModule.metadata).toEqual(expectedMetadata)
  expect(requiredModule.filename).toEqual(expectedFilename)
  expect(requiredModule.path).toEqual(expectedPath)
})

it('does not return a module for the markdown file', async () => {
  await expect(
    bundleFileAndGetCode({
      input: 'fixtures/test.md',
      plugins: [
        markdownPlugin({
          exportAsModule: false,
        }),
      ],
    })
  ).rejects.toThrow(
    'Unexpected token (Note that you need plugins to import files that are not JavaScript)'
  )
})

it('passes meta-data through Rollup', async () => {
  let rollupMetaData

  await bundleFileAndGetCode({
    input: 'fixtures/test.md',
    plugins: [
      markdownPlugin({
        parseFrontMatterAsMarkdown: true,
      }),
      {
        name: 'test-meta-data',
        moduleParsed(moduleInfo) {
          rollupMetaData = moduleInfo.meta.markdown
        },
      },
    ],
  })

  expect(rollupMetaData.metadata).toEqual(expectedMetadata)
  expect(rollupMetaData.filename).toEqual(expectedFilename)
  expect(rollupMetaData.path).toEqual(expectedPath)
})

it('adds a custom Showdown extension', async () => {
  const code = await bundleFileAndGetCode({
    input: 'fixtures/extensions.md',
    plugins: [
      markdownPlugin({
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
        ],
      }),
    ],
  })

  const requiredModule = requireFromString(code)
  expect(requiredModule.html).toMatchSnapshot()
})

it('adds a packaged Showdown extension', async () => {
  // extension registers itself
  require('showdown-twitter')

  const code = await bundleFileAndGetCode({
    input: 'fixtures/extensions.md',
    plugins: [
      markdownPlugin({
        // include extension in this run's converter
        showdownExtensions: [
          'twitter',
        ],
        showdownOptions: {
          ghMentions: false,
        },
      }),
    ],
  })

  const requiredModule = requireFromString(code)
  expect(requiredModule.html).toMatchSnapshot()
})

it('adds both a custom and a packaged Showdown extension', async () => {
  require('showdown-twitter')

  const code = await bundleFileAndGetCode({
    input: 'fixtures/extensions.md',
    plugins: [
      markdownPlugin({
        showdownExtensions: [
          {
            name: 'Markdown to Showdown',
            type: 'lang',
            regex: /markdown/g,
            replace: 'showdown',
          },
          'twitter',
        ],
        showdownOptions: {
          ghMentions: false,
        },
      }),
    ],
  })

  const requiredModule = requireFromString(code)
  expect(requiredModule.html).toMatchSnapshot()
})
