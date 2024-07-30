const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //Para trabajar html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //Para trabajar módulos css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //Para optimizar(minimizar) css
const TeserPlugin = require("terser-webpack-plugin"); //Para optimizar js
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //Limpiar carpeta dist luego de build

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][hash][ext][query]",
    publicPath: "./",
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Akai Movies",
      inject: true,
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TeserPlugin(), new CssMinimizerPlugin()],
    /*  splitChunks: {
      chunks: "all",
    }, */
  },
};
