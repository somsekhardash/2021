const config = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");

module.exports = merge(config, {
  mode: "production",
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
      template: "./index.html",
    }),
  ],
});
