function CssChunkHashPlugin(options) {
  this.options = Object.assign({
    inject: true,
  }, options);
}

CssChunkHashPlugin.prototype.createCssHash = function ({ assetsByChunkName, publicPath }) {
  return Object.keys(assetsByChunkName).reduce((hash, name) => {
    if (!assetsByChunkName[name] || !assetsByChunkName[name].find) return hash;
    const file = assetsByChunkName[name].find(file => file.endsWith('.css'));
    if (file) hash[name] = `${publicPath}${file}`;
    return hash;
  }, {});
};

CssChunkHashPlugin.prototype.getScriptTag = function (cssHash) {
  return {
    tagName: 'script',
    closeTag: true,
    attributes: {
      type: 'text/javascript',
    },
    innerHTML: `window.__CSS_CHUNKS__ = ${JSON.stringify(cssHash)}`,
  };
};


CssChunkHashPlugin.prototype.apply = function (compiler) {
  let cssHash;

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
      const webpack = compilation.getStats().toJson();
      cssHash = this.createCssHash(webpack);
      htmlPluginData.assets.cssHash = cssHash;
      callback(null, htmlPluginData);
    });

    if (this.options.inject) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
        const tag = this.getScriptTag(cssHash);
        const inject = htmlPluginData.plugin.options.inject;

        if (inject === 'head') {
          htmlPluginData.head.push(tag)
        } else {
          htmlPluginData.body.push(tag)
        }

        callback(null, htmlPluginData);
      });
    }
  });
};

module.exports = CssChunkHashPlugin;
