const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    contentBase: path.join(__dirname, "dist"),
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "images"),
          to: "images",
        },
      ],
    }),
  ],
};
