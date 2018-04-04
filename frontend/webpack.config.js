const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// all available pages
const pages = {
  index: {/* config options */},
  about: {/* config options */},
  // *add a new page here*
};

// generate a html page plugin
const htmlWebPackPlugins = Object.keys(pages).map(pageName => new HtmlWebPackPlugin({
  chunks: ['common', pageName],
  template: `./src/pages/${pageName}/${pageName}.html`,
  filename: `./${pageName}.html`,
}));

const entries = {};
Object.keys(pages).reduce((pageName) => {
  // create an entry for each page
  entries[pageName] = `./src/pages/${pageName}/${pageName}`;
  return entries;
}, {});

module.exports = {
  entry: entries,
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ].concat(htmlWebPackPlugins),
};
