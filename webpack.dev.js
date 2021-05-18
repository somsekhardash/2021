const path = require("path");
const config = require("./webpack.config");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    // historyApiFallback: true,
    // open: true,
    // compress: true,
    // hot: true,
    // overlay: true,
    // port: 8090,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Dev",
      template: "./index.html",
    }),
  ],
});
