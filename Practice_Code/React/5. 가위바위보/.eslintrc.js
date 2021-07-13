module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/prop-types": "off",
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
