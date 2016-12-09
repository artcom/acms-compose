/* eslint-disable import/no-commonjs */

const path = require("path")
const webpack = require("webpack")

const publicPath = path.join(__dirname, "public")

module.exports = {
  entry: "./src/main.js",
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
