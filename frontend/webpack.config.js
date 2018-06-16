const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


// all available pages
const pages = {
  index: {/* config options */},
  registration: {/* config options */},
  login: {/* config options */},
  homepage: {/* config options */},
  create_lunchspace: {/* config options */},
  join_lunchspace: {/* config options */},
  lunchspaces: {/* config options */},
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

const serviceWorkerWebpackConfig = {
  entry: {
    'notification-worker': './src/service_worker/notification-worker.js',
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, '../shared'),
      lib: path.resolve(__dirname, 'src/lib'),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
}

const appWebpackConfig = {
  entry: entries,
  resolve: {
    alias: {
      shared: path.resolve(__dirname, '../shared'),
      lib: path.resolve(__dirname, 'src/lib'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9100',
        pathRewrite: { '^/api': '' },
      },
      '/subscriber/*': {
        target: 'ws://localhost:9200',
        ws: true,
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
      filename: '[name].[chunkhash].css',
    }),
    new FaviconsWebpackPlugin({
      title: 'Lunchspace',
      logo: './src/assets/logo/Burger-512x512.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'favicon-[hash]/',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new FaviconsWebpackPlugin({
      title: 'Lunchspace',
      logo: './src/assets/logo/Logo-white-background-1536x1536.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'icons-[hash]/',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: false,
        firefox: true,
        opengraph: false,
        twitter: true,
        yandex: false,
        windows: false,
      },
    }),
    // new BundleAnalyzerPlugin(),
  ].concat(htmlWebPackPlugins),
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
}

module.exports = [appWebpackConfig, serviceWorkerWebpackConfig]
