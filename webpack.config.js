
const path = require('path');

module.exports = {
  mode: "development", 
  entry: {
    main: "./assets/js/main.js",
    search: './assets/js/main_search.js'
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename:'[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}