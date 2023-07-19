const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // new webpack.ProvidePlugin({
    //   React: "react",
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
};
