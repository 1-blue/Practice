#### vue-cookie
Vue.use(VueCookie)하면
this.$cookies로 접근가능하게됨
this.$cookies.isKey(key) : key에 해당하는 쿠키 존재하는지 여부 반환
this.$cookies.get(key) : key에 해당하는 쿠키값 반환

#### vuejs-jwt
Vue.use(VueJwt);
this.$jwt.decode(jwt) : jwt를 디코딩해서 객체로 반환해줌

#### this.$router
this.$router.push('url')과 <router-link to="url">은 정확하게 같은방식으로 페이지를 넘어감
.go(), .replace()도 가능