# js.config.json
`VSCode`에서 `.js`파일에 대한 설정값을 지정
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./src/*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```