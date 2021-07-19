module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "consistent-return": "off", // 이상한값 반환 경고 무시
    "func-names": "off", // 이상한값 반환 경고 무시
    "no-underscore-dangle": "off", // _시작변수 경고 무시
    "no-alert": "off", // alert사용 가능하게
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], // .js에서도 컴포넌트 사용가능하도록
    "react/prop-types": "off",
    "import/no-unresolved": "off", // import경로체크해제
    "no-use-before-define": "off", // 후선언후 사용 에러 무시
    "prettier/prettier": [
      // eslint에 prettier추가
      "error",
      {
        singleQuote: false, // '나 " 선택
        semi: true, // 세미콜론필수여부
        useTabs: false, // 탭사용여부
        tabWidth: 2, // 탭간격
        trailingComma: "all", // 여러줄 사용시 후행 콤마 방식 사용
        printWidth: 120, // 줄바꿈 폭길이지정
        bracketSpacing: true, // 객체 리터럴에서 괄호에 공백 삽입 여부
        arrowParens: "avoid", // 화살표 함수 괄호 사용 방식
        endOfLine: "auto",
      },
    ],
  },
};
