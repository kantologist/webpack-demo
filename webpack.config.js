const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const WebpackDashboard = require('webpack-dashboard/plugin');
const glob = require('glob');
const webpack = require('webpack');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style:glob.sync('./app/**/*.css'),
};

// module.exports = {
const commonConfig = merge([
  {
  entry: {
    app: PATHS.app,
    style: PATHS.style,
    vendor: ['react'],
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
      template: path.join(PATHS.app,'index.html')
    }),
    new WebpackDashboard(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
  },
  parts.lintJavaScript({  include: PATHS.app }),
  parts.lintCSS({ include: PATHS.app }),
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
  parts.loadJavaScript({ include:PATHS.app }),
]);

const productionConfig = merge([
  parts.clean(PATHS.build),
  parts.attachRevision(),
  parts.extractCSS({
    use:['css-loader', parts.autoprefix()],
}),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit:15000,
      name: '[name].[ext]',
    },
  }),
  parts.generateSourceMaps({type: 'source-map'}),
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
