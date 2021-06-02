[여기](https://joshua1988.github.io/webpack-guide/)참고해서 정리하려고 적는 글

# webpack
모듈 번들러이며, 모듈 번들러란 웹을 구성하는 자원들을 모두 각각의 모듈로 보고 이를 조합해서 하나의 결과물을 만드는 도구    
( 웹을구성하는자원 : HTML, CSS, JavaScript, Image, font 등등 )

## 1. webpack.config.js
기본적으로 `webpack`을 실행할 때 설정해줘야 하는 설정값들이 많은데 ( `webpack --mode=none`같은 설정 )   
이 설정들을 실행할 때 마다 스크립트에 치기가 힘들어서 `webpack.config.js`라는 파일을 만들어서 설정값을 저장해두면 `webpack`을 실행할 때 자동적으로 읽어서 설정값을 지정해줌     
mode, output, entry, 

### 1.1 mode
none, production, development   
```javascript
module.exports = {
  mode: 'none',
};
```

### 1.2 entry
웹 자원을 변환하기 위한 최초의 진입점 ( JavaScript파일경로 )    
```javascript
module.exports = {
  entry: './src/index.js',
};
```

### 1.3 output
번들링한 결과물에 대한 정보를 수정
1. `filename` : 옵션으로 결과물의 이름을 지정할 수 있음
    + `[name]` : 기존 파일명과 같은이름으로 지정
    + `[id]` : ?
    + `[hash]` : 결과물에 고유의 해쉬값을 붙임
    + `[chunkhash]` : ?

2. `path` 옵션으로 결과물의 경로를 지정할 수 있음

```javascript
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',    // [name] or [hash]를 붙일 수 있음
    path: path.resolve(__dirname, 'dist')
  }
};
```

### 1.4 module ( loader )
자바스크립트가 아닌 웹자원들을 변환할 때 사용 (css, vue, png 등등)
```javascript
module: {
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader'
    }
  ]
}
```
rules배열내부에 loader를 지정할 파일들과 로더를 적음
+ `test` : 로더를 지정할 파일유형 ( 정규표현식 사용 )
+ `use` : 사용할 로더를 적음 ( 여러개 적용시 오른쪽 -> 왼쪽순으로 로더를 실행 )

### 1.5 plugin
번들링의 결과물의 형태를 바꿔줌   
```javascript
module: {
  plugins: [
    new VueLoaderPlugin(),
  ],
}
```

## 예시
### 기본적으로 적용
```javascript
var path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']   // css-loder -> style-loader 순서로 적용
        // 1. css-loader는 css파일을 해석함
        // 2. style-loader는 해석한 css파일을 .html의 <style></style>에 적용함
      }
    ]
  },
  devtool: 'source-map',
};
```

### 플러그인까지 적용
css파일을 따로 나눠서 dist폴더에 css파일을 추가해줌
```javascript
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },    // style태그에 넣지않고 다른 css파일을 만들어서 결과물을 넣음
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),    // 생성자 함수의 인스턴스만 넣을 수 있음
  ],
  devtool: 'source-map',
};
```

## 2. dev-server
파일로 만들지않고 메모리에 올려서 바로 사용   
코드변화시 바로 적용시켜줌

### 2.1 예시
`HtmlWebpackPlugin`을 사용하면 생성된 `css파일`들이 자동적으로 `<link>`로 포함됨    
따라서 `webpack-dev-server`로 생성된 메모리상의 파일중에 `index.html`이 생성되며 내부 파일변경시마다 자동적으로 업데이트해줘서 따로 새로고침이나 빌드를 해주지않아도 바로바로 적용되는 효과를 얻을 수 있음
```javascript
// npm
npm i html-webpack-plugin -D

// package.json
"scripts": {
  "build": "webpack",
  "serve": "webpack serve"
},

// webpack.config.js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader' , 'css-loader' ]
      }
    ]
  },
  devServer: {
    port: 9000,     // 사용할 포트
  },
  plugins: [        // index.html의 형태를 기반으로 생성해라는 의미
    new HtmlWebpackPlugin({ template: 'index.html' }),
  ],
};
```

# 추가공부할거
+ publicPath
+ devServer
+ babel-loader ( exclude )
+ file-loader ( option )
+ resolve ( alias, extensions )
+ performance
+ devtool