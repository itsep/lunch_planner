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
    chunks: ['common', pageName],
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
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "common",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ].concat(htmlWebPackPlugins),
};
