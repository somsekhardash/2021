const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const ASSET_PATH = "/";
const dotenv = require("dotenv");
const configEnv = dotenv.config().parsed;
const envKeys = Object.keys(configEnv).reduce((result, key) => {
  result[`process.env.${key}`] = JSON.stringify(configEnv[key]);
  return result;
}, {});

const BUNDLE_ANALYZE = process.env.BUNDLE_ANALYZE || false;

const entry = "./src/index.tsx";

const output = {
  filename: "[name].bundle.js",
  path: path.resolve(__dirname, "dist"),
  publicPath: "/",
  clean: true,
};

const _module = {
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
};

const optimization = {
  splitChunks: {
    cacheGroups: {
      react: {
        test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
        name: "react",
        chunks: "all",
      },
      common: {
        test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
        name: "vender",
        chunks: "all",
      },
    },
  },
};

const resolve = {
  extensions: [".tsx", ".ts", ".js"],
  alias: {
    src: path.resolve(__dirname, "src/"),
  },
};

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin(envKeys),
  new webpack.DefinePlugin({
    "./dist": JSON.stringify(ASSET_PATH),
  }),
  new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
  }),
  new CopyPlugin({
    patterns: [{ from: "./manifest.json", to: "manifest.json" }],
  }),
];

if (BUNDLE_ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry,
  output,
  module: _module,
  optimization,
  resolve,
  plugins,
};
