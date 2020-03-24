const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [ new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist']
    })],
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',

        options: {
          plugins: ["@babel/plugin-syntax-dynamic-import"],

          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
          ],
        },

        test: /\.js$/,
      },
    ],
  }, module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  output: {
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
  },

  optimization: {},
};