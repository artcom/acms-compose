/* eslint-disable import/no-commonjs */

const path = require("path")
const webpack = require("webpack")

const publicPath = path.join(__dirname, "public")

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    path: publicPath,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel"
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: "file?name=[path][name].[ext]"
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
  ],
  devServer: {
    contentBase: publicPath
  }
}
