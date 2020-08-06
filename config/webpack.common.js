const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const distPath = path.resolve(__dirname, "../dist"); // output path
const sharedPath = 'common/';  // shared file(css | js) location(relative to your output path)
const pagePath = path.resolve(__dirname, "../src/pages"); // page path
const nodeModulesPath = path.resolve(__dirname, './node_modules');

const envName = process.env.NODE_ENV

// 注册多页面
const entries = {};
const plugins = envName === "development"?[]: [
  new MiniCssExtractPlugin({
    filename: "[name]/[name].css",
    chunkFilename: sharedPath + "main.css"
  }),
]
// uglify css
plugins.push(new OptimizeCssAssetsWebpackPlugin())

// using fs to generate multipage app
const dirs = fs.readdirSync(pagePath);
dirs.forEach(dir=>{
  entries[dir] = `${pagePath}/${dir}/index.js`;

  if (dir === "index"){
    plugins.push(new HtmlWebpackPlugin({
      chunks: [dir, "commons"],
      filename: `${distPath}/index.html`,
      template: `${pagePath}/${dir}/index.pug`,
      hash: true,
    }));
  } else {
    plugins.push(new HtmlWebpackPlugin({
      chunks: [dir, "commons"],
      filename: `${distPath}/${dir}/index.html`,
      template: `${pagePath}/${dir}/index.pug`,
      hash: true,
    }));
  }

});

module.exports = {
  mode: "development",
  entry: entries,
  output:{
    path: distPath,
    filename:"[name]/[name].js",
    chunkFilename: sharedPath + "[name].js"
  },
  module:{
    rules:[{
      test: /\.pug$/,
      loader: "pug-loader"
    },{
      test: /\.(scss|sass|css)$/,
      exclude: nodeModulesPath,
      use:[
        // 开发模式使能 hmr
        {
        loader: envName === "development"? "style-loader" : MiniCssExtractPlugin.loader,
      },{
        loader: "css-loader"
      },{
        loader: "sass-loader"
      }]
    },
      {
      test: /\.js$/,
      use:{
        loader: 'babel-loader'
      },
      exclude: nodeModulesPath
    }
    ]
  },
  plugins,
}
