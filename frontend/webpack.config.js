const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// all available pages
const pages = {
  index: {/* config options */},
  about: {/* config options */},
  // *add a new page here*
}

// generate a html page plugin
const htmlWebPackPlugins = Object.keys(pages).map((pageName) => {
  return new HtmlWebPackPlugin({
    chunks: [pageName],
    template: `./src/pages/${pageName}/${pageName}.html`,
    filename: `./${pageName}.html`,
  })
})

module.exports = {
  entry: Object.keys(pages).reduce((entries, pageName) => {
    // create an entry for each page
    entries[pageName] = `./src/pages/${pageName}/${pageName}`
    return entries
  }, {}),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ].concat(htmlWebPackPlugins)
};
