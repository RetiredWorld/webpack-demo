const {merge} = require("webpack-merge");
const webpack = require('webpack');

const ip = require('ip');
const common = require("./webpack.common");

const port = 3333;
const ipAddress = ip.address() + ':' + port

const config = {
  mode: "development",
  devtool: 'eval-source-map',
  output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer:{
    contentBase: "../src",
    historyApiFallback: true,
    host: "0.0.0.0",
    inline: true,
    port: port,
    public: ipAddress
  }
}

module.exports = merge(common, config)
