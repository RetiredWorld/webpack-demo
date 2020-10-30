const { merge: devMerge } = require('webpack-merge');
const webpack = require('webpack');

const ip = require('ip');
const devCommon = require('./webpack.common.ts');

const port = 3333;
const ipAddress = `${ip.address()}:${port}`;

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: '../src',
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
    port,
    public: ipAddress,
    quiet: true,
  },
};

module.exports = devMerge(devCommon, devConfig);
exports.esModule = true;
