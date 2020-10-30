const { merge: prodMerge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prodCommon = require('./webpack.common.ts');

const prodPlugins = [new CleanWebpackPlugin()];

const prodConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
          name: 'common',
        },
        default: false,
      },
    },
  },
  plugins: prodPlugins,
};

module.exports = prodMerge(prodCommon, prodConfig);
