#
+ CDN `<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>`
+ NPM `npm install vue-router`
+ `Vue.use(VueRouter);`

<hr />
<br />
<hr />

# 1. 사용방식
## 1.1 예시
```javascript
const Foo = {
  template: `<div>foo</div>`
};

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: { template: `<div>bar</div>` } },
  ]
});

const vm = new Vue({
  el: "#app",
  router,
});
```
1. VueRouter: 객체형태로 정해진 속성에 값을 넣어줌
+ path: url주소
+ component: 지정한 path에 접근했을 때 보여줄 컴포넌트

<hr />
<br />
<hr />

# 2. 동적라우트매칭
```javascript
{ path: '/user/:userid', component: User }
```
위와 같이 동적라우팅 가능하고 값은 `this.$route.params`에 들어있음

<hr />
<br />
<hr />

# 3. 중첩된 라우트
```javascript
const Foo = {
  template: `<div>foo</div>`
};
const User = {
  template: 
  `
  <div>
    {{ $route.params.userId }}
    <router-view></router-view>
  </div>
  `,
};

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { 
    path: '/user/:userId',
    component: User,
    children: [
      { path: 'foo', component: Foo }
    ]
  },
];

const router = new VueRouter({
  routes
});

const vm = new Vue({
  el: "#app",
  router,
});
```
`/user/1-blue`일 땐 User를 보여주고   
`/user/1-blue/foo`일 땐 User에 내부에서 `<router-view>`위치에 Foo를 같이 보여줌

<hr />
<br />
<hr />

# 4. 프로그래밍 방식 네비게이션
## 4.1 router.push()
```javascript
// 리터럴 string
router.push('home');

// object   // /home
router.push({ path: 'home' });

// 이름을 가지는 라우트   // routes의 name이 정의되어있어야함
router.push({ name: 'user', params: { userId: 123 }});

// 쿼리와 함께 사용, 결과는 /register?plan=private 입니다.
router.push({ path: 'register', query: { plan: 'private' }});
```
`<router-link>`를 클릭해서 이동하는 것과 같음   
`window.history.pushState`모방

## 4.2 router.replace(location)
push와 같은 행동을 하지만 history에 기록을 남기지 않음    
`window.history.replaceState`모방

## 4.3 router.go(n)
기록된것의 앞, 뒤로 이동함    
`window.history.go(n)`모방

<hr />
<br />
<hr />

# 5. 이름을 가지는 라우트


<hr />
<br />
<hr />

# 6. 이름을 가지는 뷰
하나의 링크에 여러개의 컴포넌트를 한번에 보여줄 때 사용
```javascript
// html
<div id="app">
  <h1>Hello App!</h1>
  <router-view></router-view>
  <router-view name="a"></router-view>
  <router-view name="b"></router-view>
</div>

// js
const Foo = { template: `<div>foo</div>` };
const Bar = { template: `<div>bar</div>` };
const Baz = { template: `<div>baz</div>` };

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz,
      }
    }
  ]
});
```
`/`로 접근하면Foo, Bar, Baz를 순서대로 한번에 보여줌    
이름없는건 default로 자동설정됨

<hr />
<br />
<hr />

# 7. 리다이렉트
```javascript
routes: [
  { path: '/a', redirect: '/b' },   // 일반적인경우
  { path: '/a', redirect: { name: 'foo' } },   // 이름을 가진 라우트
];
```

<hr />
<br />
<hr />

# 7. 리다이렉트


<hr />
<br />
<hr />

# 7. 리다이렉트


<hr />
<br />
<hr />

# 0. 일단정리
## . 전체
```javascript
const Foo = {
  template: `<div>foo</div>`
};

const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      name: 'foo',
      children: [
        { path: 'user', component: User }
      ],
      redirect: '/link',
      props: true,        // route.params가 props로 설정됨

    },
  ]
});

const vm = new Vue({
  el: "#app",
  router,
});
```

## . 라우팅감시
```javascript
beforeRouteUpdate (to, from, next) {
  console.log(to);
  console.log(from);
  console.log(next);
}
```