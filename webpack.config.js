const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './dist/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MinifyPlugin({
      removeConsole: false
    }, {
      comments: false
    })
  ]
}