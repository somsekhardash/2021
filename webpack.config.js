const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const ASSET_PATH = "/";
const dotenv = require("dotenv");

const configEnv = dotenv.config().parsed;
const envKeys = Object.keys(configEnv).reduce((result, key) => {
  result[`process.env.${key}`] = JSON.stringify(configEnv[key]);
  return result;
}, {});

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      Src: path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(envKeys),
    new webpack.DefinePlugin({
      "./dist": JSON.stringify(ASSET_PATH),
    }),
  ],
};
