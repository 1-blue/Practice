# 1. eslint
`es`는 `ECMAScript`, `lint`는 보푸라기라는 의미   
한줄요약하자면 문법에러를 잡거나 특정 문법을 사용하기 위한 것

## 1.1 기본사용법
1. 설치 : `npm i eslint -D`
2. 실행 : `npx eslint app.js`

## 1.2 설정
`eslintrc.js`파일 생성    
[rules](https://eslint.org/docs/rules/)지정
```javascript
// eslintrc.js
module.exports = {
  root: true,   // 루트레벨내부에만 eslint적용
  rules: {
    "no-console": "off",    // console.log()무시
    "semi": "error"         // off, warn, error (0, 1, 2)존재
  }
};
```

# 2. prettier
tab간격이나 `;`, `"`같은 미학적(?)인 규칙을 지정하는 것    

## 2.1 기본사용법
1. `npm i prettier -D`

# 3. eslint와 prettier
## 3.1 설치할것
1. `eslint-config-prettier` // prettier와 eslint충돌할 설정들 비활성화
2. `eslint-plugin-prettier` // 코드포멧시 prettier규칙추가
`npm install eslint-plugin-prettier eslint-config-prettier -D`

## 3.2 예시
`rules`에 `["레벨종류", { prettier설정값 } ]`   
```javascript
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'prettier/prettier': [    // eslint에 prettier추가
      'error',
      {
        singleQuote: false,   // '나 " 선택
        semi: true,           // 세미콜론필수여부
        useTabs: false,       // 탭사용여부
        tabWidth: 2,          // 탭간격
        trailingComma: 'all', // 여러줄 사용시 후행 콤마 방식 사용
        printWidth: 80,       // 줄바꿈 폭길이지정
        bracketSpacing: true, // 객체 리터럴에서 괄호에 공백 삽입 여부
        arrowParens: 'avoid', // 화살표 함수 괄호 사용 방식
        endOfLine: "auto",
      },
    ],
  },
};
```

# 4. VSCode
## 4.1 setting.json
```json
"editor.codeActionsOnSave": { "source.fixAll.eslint": true },
"editor.formatOnType": true,
"eslint.validate": [
    {
        "language": "vue",
        "autoFix": false
    },
    {
        "language": "javascript",
        "autoFix": true
    }
],
```

## 4.2 plugin
`eslint`와 `prettier`플러그인 설치