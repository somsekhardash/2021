const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { NODE_ENV = "production" } = process.env;
module.exports = {
  entry: "./server/server.ts",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server-[name].bundle.js",
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
