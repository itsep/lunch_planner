const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// all available pages
const pages = {
  index: {/* config options */},
  registration: {/* config options */},
  login: {/* config options */},
  create_lunchspace: {/* config options */},
  // *add a new page here*
}

// generate a html page plugin
const htmlWebPackPlugins = Object.keys(pages).map(pageName => new HtmlWebPackPlugin({
  chunks: ['common', pageName],
  template: `./src/pages/${pageName}/${pageName}.html`,
  filename: `./${pageName}.html`,
}))

const entries = {}
Object.keys(pages).forEach((pageName) => {
  // create an entry for each page
  entries[pageName] = [
    'babel-polyfill',
    `./src/pages/${pageName}/${pageName}`,
  ]
}, {})

module.exports = {
  entry: entries,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        pathRewrite: { '^/api': '' },
      },
    },
  },
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
}
