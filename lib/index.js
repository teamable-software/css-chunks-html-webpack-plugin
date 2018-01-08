function CssChunkHashPlugin(options) {
  this.options = Object.assign({
    inject: 'head',
  }, options);
}

CssChunkHashPlugin.prototype.createCssHash = function ({ assetsByChunkName, publicPath }) {
  return Object.keys(assetsByChunkName).reduce((hash, name) => {
    if (!assetsByChunkName[name] || !assetsByChunkName[name].find) return hash;
    const file = assetsByChunkName[name].find(file => file.indexOf('.css') >= 0 && file.indexOf('.css.map') < 0);
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

    const inject = this.options.inject;

    if (inject) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
        const tag = this.getScriptTag(cssHash);

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
