const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "gugudan-setting",
  mode: "development",    // production
  devtool: "eval",        // ? 빠르게

  resolve: {
    extensions: [".js", ".jsx"],   // 지정한 확장자는 자동으로 찾아줌
  },
  entry: {
    app: ["./src/index.js"],   // client.js에서 불러오는 파일을 자동적으로 포함시켜줌
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,           // 적용할 파일
        loader: "babel-loader",   // 적용할 내용 ( 웹팩과 바벨 연결 )
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],   // 적용할 옵션 ( 브라우저에 따라서 자동적으로 적용, 리액트적용 )
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        }
      }
    ]
  },
  plugins: [
    new RefreshWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, "dist"),   // 현재 경로의 dist폴더
    filename: "app.js",
    publicPath: "/dist/"                  // 가상경로
  },
  devServer: {
    publicPath: "/dist/", 
    hot: true,
  },
}