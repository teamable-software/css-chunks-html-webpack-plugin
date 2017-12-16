# css-chunks-html-webpack-plugin
Plugin for injecting css chunks, extracted using extract-css-chunks-webpack-plugin, to HTML for html-webpack-plugin

Use in conjunction with
[extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin) and
[babel-plugin-dual-import](https://github.com/faceyspacey/babel-plugin-dual-import)
to inject CSS chunks paths into your HTML file with
[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

## Recommended Installation

```bash
npm install --save-dev css-chunks-html-webpack-plugin \
 extract-css-chunks-webpack-plugin babel-plugin-dual-import \
 html-webpack-plugin
```

*webpack.config.js*
```js
  const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CssChunkHashPlugin = require('../lib');


  module.exports = {
    // your other options
    plugins: [
      new ExtractCssChunks(),
      new CssChunkHashPlugin({ inject: 'head' }),
      new HtmlWebpackPlugin(),
    ]
  };

```

## Configuration

You can pass an object of configuration options to CssChunkHashPlugin. Allowed values are as follows:

* `inject`: `'head'` | `'body'` | `false` whether to inject chunks paths script into HTML, used for manually adding
chunks paths using custom template for HtmlWebpackPlugin (default `true`)

The CSS chunks paths map is saved in `htmlWebpackPlugin.files.cssHash` in your template. So if you want to manually add
CSS chunks map you can do (if you are using EJS):

```ejs
<script type="text/javascript">
    window.__CSS_CHUNKS__ = JSON.parse('<%= JSON.stringify(htmlWebpackPlugin.files.cssHash) %>')
</script>
```

By default, it will inject script tag into `<head>`. If you want to inject the script tag with `window.__CSS_CHUNKS__`
 into `<body>` set `inject: 'body'`,

## Example

There is a basic example of usage in [examples][examples]

# Contribution

You're free to contribute to this project by submitting [issues](https://github.com/mike1808/css-chunks-html-webpack-plugin/issues) and/or [pull requests](https://github.com/mike1808/css-chunks-html-webpack-plugin/pulls).

# License

This project is licensed under [MIT](LICENSE).
