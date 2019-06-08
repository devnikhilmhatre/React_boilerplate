const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body',
  favicon: path.join(__dirname, '/src/favicon.ico'),
  excludeChunks:['sw']
});

const MCEPlugin = new MiniCssExtractPlugin({
  filename: "css/main.css",
})

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  entry: {
    main: ['react-hot-loader/patch', path.join(__dirname, '/src/index.js')],
    sw: path.join(__dirname, '/src/sw.js')
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [
          /node_module/,
          /^sw\.js$/
        ],
        use: [
          {
              loader: 'babel-loader'
          }
      ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, '/build'),
  },
  mode: dev ? 'development' : 'production',
  plugins: dev
    ? [
      HTMLWebpackPluginConfig,
      MCEPlugin,
      new webpack.HotModuleReplacementPlugin(),
    ]
    : [HTMLWebpackPluginConfig, MCEPlugin, DefinePluginConfig],
};
