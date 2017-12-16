const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssChunkHashPlugin = require('../lib');


module.exports = {
  context: __dirname,
  entry: {
    a: './a.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractCssChunks.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            },
          }
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { 'modules': false }]],
            plugins: ['dual-import', 'syntax-dynamic-import']
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractCssChunks(),
    new CssChunkHashPlugin(),
    new HtmlWebpackPlugin(),
  ]
};
