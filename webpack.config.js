const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const WebpackDashboard = require('webpack-dashboard/plugin');
const glob = require('glob');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style:glob.sync('./app/**/*.css'),
};

const commonConfig = merge([
  {
  entry: {
    app: path.join(PATHS.app, 'index.js'),
    style: PATHS.style,
    vendor: ['react'],
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  resolve: {
      'alias': {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
      template: path.join(PATHS.app,'index.html'),
      chunksSortMode:'dependency'
    }),
    new WebpackDashboard(),
    new OfflinePlugin({
      publicPath: '/webpack-demo/',
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
      }),
    // new webpack.optimize.AggressiveSplittingPlugin({
    //   minSize: 10000,
    //   maxsize: 30000,
    // }),
  ],
  },
  parts.extractBundles([
    {
      names:['vendors',],
      // minChunks: 1,
       minChunks: ({ resource }) => (
       resource &&
       resource.indexOf('node_modules') >= 0 &&
       resource.match(/\.js$/)
       ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },

  ]),
  parts.lintJavaScript({  include: PATHS.app }),
  parts.lintCSS({ include: PATHS.app }),
  parts.loadFonts({
    options: {
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.loadJavaScript({ include:PATHS.app }),
]);

const productionConfig = merge([
  {
    performance:{
      hints:'warning',
      maxEntrypointSize: 100000,
      maxAssetSize: 450000,
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
      publicPath: '/webpack-demo/',
    },
    plugins:[
      new webpack.HashedModuleIdsPlugin(),

    new CopyWebpackPlugin([{
      from: path.join(PATHS.app, '/icons/'),
      to: path.join(PATHS.build),
    }]),
    ],
    recordsPath: 'records.json',
  },
  parts.clean(PATHS.build),
  parts.minifyJavascript({ useSourceMap: true }),
  parts.minifyCSS({
    options:{
      discardComments: {
        removeAll: true,
      },
      safe:true,
    },
  }),
  parts.attachRevision(),
  parts.extractCSS({
    use:['css-loader?modules,localIdentName="PURIFY_[name]-[local]-[hash:base64:6]",camelCase', parts.autoprefix()],
  }),
  // parts.purifyCSS({
  //   paths: glob.sync(`${PATHS.app}/**/*`, { nodir: true }),
  //   purifyOptions : {
  //       whitelist: ['*PURIFY*'],
  //     },
  // }),
  parts.loadImages({
    options: {
      limit:15000,
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.generateSourceMaps({type: 'source-map'}),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
  parts.compressAssets(),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack://[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map'}),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadSASS(),
  parts.loadImages(),
  ]);

module.exports = (env) => {

  if (env == 'production'){
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
