const { merge } = require('webpack-merge');

const common = require('./webpack.common');

const config = {
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

module.exports = merge(common, config);
