const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "@react": path.resolve(__dirname, "src/lib/react"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "images"),
          to: "images",
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
