const { prodMerge } = require('webpack-merge');

const prodCommon = require('./webpack.common.ts');

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
};

module.exports = prodMerge(prodCommon, prodConfig);
