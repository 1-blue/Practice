# 1. vue-cli설치
`npm install -g @vue/cli`
`npm update -g @vue/cli`
`npm vue --version`
`npm install -g @vue/cli-service-global`   // vue serve실행하려면 설치해야함    
+ global설치 위치 : `%USERPROFILE%\AppData\Roaming\npm\node_modules`

<hr />
<br />
<hr />

# 2. 프로젝트생성
`vue create 설치할폴더명`

<hr />
<br />
<hr />

# 3. 프로젝트 실행
`npm run serve`
`npm run build`

<hr />
<br />
<hr />

# 추가정보
## 1. eslint끄기
1. 해당 파일의 `<script>`에 `// eslint-disable-next-line`넣기
2. 해당 파일의 `<script>`에 `/* eslint-disable */`넣기
3. `vue.config.js`파일생성
```javascript
module.exports = {
  lintOnSave: false
}
```
