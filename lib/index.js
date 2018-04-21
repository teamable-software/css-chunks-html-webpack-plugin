class CssChunkHashPlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        inject: 'head',
      },
      options
    );
  }

  createCssHash(chunks, publicPath) {
    return chunks.reduce((hash, { name, files }) => {
      if (!Array.isArray(files)) return hash;
      const file = files.find(file => file.includes('.css') && !file.includes('.css.map'));
      if (file) hash[name] = `${publicPath}${file}`;
      return hash;
    }, {});
  }

  getScriptTag(cssHash) {
    return {
      tagName: 'script',
      closeTag: true,
      attributes: {
        type: 'text/javascript',
      },
      innerHTML: `window.__CSS_CHUNKS__ = ${JSON.stringify(cssHash)}`,
    };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('CssChunksHtmlWebpackPlugin', compilation => {
      let cssHash;

      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        'html-webpack-plugin-before-html-generation',
        (htmlPluginData, callback) => {
          cssHash = this.createCssHash(compilation.chunks, compilation.outputOptions.publicPath);
          htmlPluginData.assets.cssHash = cssHash;
          callback(null, htmlPluginData);
        }
      );

      const inject = this.options.inject;

      if (inject) {
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
          'html-webpack-plugin-alter-asset-tags',
          (htmlPluginData, callback) => {
            const tag = this.getScriptTag(cssHash);

            if (inject === 'head') {
              htmlPluginData.head.push(tag);
            } else {
              htmlPluginData.body.push(tag);
            }

            callback(null, htmlPluginData);
          }
        );
      }
    });
  }
}

module.exports = CssChunkHashPlugin;
