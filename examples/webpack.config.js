const path = require('path');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssChunkHashPlugin = require('../lib');

module.exports = {
  context: __dirname,
  entry: {
    a: './a.js',
  },
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          ExtractCssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', { modules: false }]],
            plugins: ['dual-import', 'syntax-dynamic-import'],
          },
        },
      },
    ],
  },
  plugins: [new ExtractCssPlugin({}), new HtmlWebpackPlugin(), new CssChunkHashPlugin()],
};
