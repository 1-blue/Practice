# vue-api
[Vue-API](https://kr.vuejs.org/v2/api/)읽고 정리하는 문서

<br />
<hr />
<br />

# 1. 전역설정
## 1.1 Vue.config
Vue의 전역설정을 가지고 있는 객체임   
### 1.1.1 silent
모든 Vue의 로그와 경고를 출력하지 않음    
`Vue.config.silent = true`

### 1.1.2 optionMergeStrategies
??    

### 1.1.3 devtools
Vue-devtools사용할 수 있게 만듦   
`Vue.config.devtools = true`    

### 1.1.4 errorHandler
```javascript
Vue.config.errorHandler = function (err, vm, info) {
  // 에러 핸들링
  // 실행조건을 아직 모르겠음
}
```

### 1.1.5 warnHandler
전역적으로 경고가 생길경우 콜백함수를 대신해서 호출함 ( 배포시에는 무시됨 )
```javascript
Vue.config.warnHandler = (msg, vm, trace) => {
  console.error(msg);   // 경고메시지
  console.error(vm);    // 경고일어난 뷰모델
  console.error(trace); // 경고생긴위치구조
};
```

### 1.1.6 ignoredElements
사용자 정의 엘리먼트 무시   
```javascript
Vue.config.ignoredElements = [
  'my-custom-web-component',
  'another-web-component',
  // `RegExp`를 이용해 "ion-" 으로 시작하는 모든 엘리먼트를 무시함
  // 2.5+ only
  /^ion-/
]
```
기본적으로 사용자정의태그를 만나면 vue에서 사용자정의태그를 찾고 없으면 에러를 표시하는데   
해당태그가 vue를 위한 태그가 아니라는것을 명시하는것임    

### 1.1.7 keyCodes
[keycode](https://keycode.info/)를 지정할 수 있음   
```javascript
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase는 작동하지 않습니다.
  mediaPlayPause: 179,
  // 쌍따옴표로 감싸진 kebab-case를 사용하세요
  "media-play-pause" : 179,
  up: [38, 87]
}

// 사용
<button type="button" @click.up="testFunc">
```

### 1.1.8 performance
true로 설정하면 브라우저 devtool의 타임라인에서 컴포넌트 초기화, 컴파일, 렌더링 및 패치 성능 추적을 활성화할 수 있습니다.   
개발 모드 및 performance.mark API를 지원하는 브라우저에서만 작동합니다.   
`Vue.config.performance = true`

### 1.1.9 productionTip
false로 설정하면 배포에 대한 팁을 출력하지 않습니다.    
`Vue.config.performance = false`

<br />
<hr />
<br />

# 2. 전역 API
## 2.1 Vue.extend(option)
???     
https://kr.vuejs.org/v2/api/#Vue-extend

## 2.2 Vue.nextTick( [callback, context] )
???     
https://kr.vuejs.org/v2/api/#Vue-nextTick

## 2.3 Vue.set( target, propertyName/index, value )
vue에 이미등록된 오브젝트에 새로운 속성을 반응형으로 추가하고 싶을 때 사용

## 2.4 Vue.delete( target, propertyName/index )
vue에 이미등록된 오브젝트에 속성을 삭제할 때 사용

## 2.5 Vue.directive( id, [definition] )
사용자 정의 디렉티브 만들 때 사용   
```javascript
Vue.directive("my", {
  bind(el, binding, vnode){
    console.log("bind");
    console.log("최초 바인딩된경우 한번만 호출");
    console.log(el);        // 현재태그
    console.log(binding);   // 디렉티브정보
    console.log(vnode);     // VNode정보
  },
  inserted(){
    console.log("inserted");
    console.log("부모노드에 삽입되었을 경우 호출");
  },
  update(){
    console.log("update");
    console.log("포함하는 컴포넌트가 업데이트된후 호출");
  },
  componentUpdated(){
    console.log("componentUpdated");
    console.log("포함하는 컴포넌트와 그 자식들이 업데이트된후 호출");
  },
  unbind(){
    console.log("unbind");
    console.log("언바인딩된경우 호출");   
  }
})
```
## 2.6 Vue.filter( id, [definition] )
```javascript
Vue.filter("test", function(value){
  if(typeof value !== "string")   return;

  return value.toUpperCase();
});

// 사용
<div>{{ str | test }}</div>
```
`|`와 같이 사용해야하고 필터링하는것

## 2.7 Vue.component( id, [definition] )
전역컴포넌트 등록

## 2.8 Vue.use( plugin )
Vue.js 플러그인을 설치합니다.   
플러그인이 Object인 경우 install 메소드를 가져야 합니다.    
플러그인이 함수 그 자체이면 install 메소드로 처리됩니다.    
install 메소드는 Vue를 인자로 사용해 호출합니다.

## 2.9 Vue.mixin( mixin )
전역 mixin적용, 생성된 모든 인스턴스에 적용됨

## 2.10 Vue.compile( template )
render공부필요한데 이거 읽어도 솔직히 이해를 못하겠음..   
https://kr.vuejs.org/v2/api/#Vue-compile

## 2.11 Vue.observable (객체)
??....    
https://kr.vuejs.org/v2/api/#Vue-observable

## 2.12 Vue.version
현재 설치된 Vue버전을 가져옴

<br />
<hr />
<br />

# 3. 옵션/데이터
## 3.1 data
data속성을 정의하면 내부적으로 getter/setter를 정의해서 반응형으로 만듬   
**객체는 반드시 기본객체여야함** ( 브라우저API, 프로토타입속성은 무시됨 )   
인스턴스 생성후 `vm.$data.a` or `vm.a`로 접근가능 ( `vm.a` === `vm.$data.a` | `vm.a`는 내부적으로 vue가 사용하기 편하게 하려고 data속성의 프로퍼티를 밖으로 꺼낸것임... 인스턴스에서 this.a로 접근가능한 이유 )
단, `_`나 `$`로 시작하는 속성은 Vue의 내부속성 or API와 충돌할 수 있으므로 vm.a로 접근불가능    
예를 들어 `$emit`이라는 변수를 선언하면 `vm.$emit`과 충돌될 위험이 있으므로 vue자체적으로 $emit을 밖으로 꺼내지않아서 `vm.$data.$emit`으로 접근해야함

## 3.2 props
상위 컴포넌트에서 데이터를 받는 리스트    
+ type      : 타입지정
+ default   : 기본값지정
+ require   : 필수지정
+ validator : 유효성검사기 ( return값이 유효한건지 검사... 실패시 콘솔에 경고발생 )

## 3.3 computed
첫번째 인수는 자동으로 this   
캐싱되며 의존하는 반응형 속성(data속성)이 변경되는 경우 다시 평가함   
만약 의존하는 속성이 반응형이 아닌경우 갱신되지않음   

## 3.4 methods

## 3.5 watch
```javascript
var vm = new Vue({
  data(){
    return{
      x: {
        data: "",
        level: 1,
      }
    }
  },
  watch: {
    x: {
      handler: "testFunc",
      deep: true,
      immediate: true, 
    },
    "x.level": function(val){ ... }   // deep안쓰고 이렇게 사용해도됨
  },
  methods: {
    testFunc(val, oldVal){
      console.log(val.data);
      console.log(oldVal.data);
    }
  }
})
```
`x(val, oldVal){ ... }`가능, methods에 정의한 함수 사용시 `hendler`속성이용   
`deep`속성은 감시할 데이터가 object인경우 내부속성은 감시못하므로 `deep = true`부여하면 object내부속성까지 감시함   
`immediate`속성은 데이터 변화와 별개로 최초에 바로 한번 실행하는 속성    
`"x.level"`이거 사용할 때는 주의해야할게 `oldVal`값이 존재하지않으므로 경고뜨니까 조심해야함

<br />
<hr />
<br />

# 4. 옵션들
## 4.1 el
Vue인스턴스에 마운트(장착)할 DOM엘리먼트 지정   
혹은 `vm.$mount()`를 사용해서 장착해야함
```javascript
new Vue({
  el: "#app',
});

new Vue({
}).$mount("#app");
```
위 두개는 같은 동작을 함

## 4.2 template
Vue인스턴스의 마크업으로 사용할 문자열템플릿임    
template에 사용된 마크업은 마운트(장착)된 엘리먼트를 대체함   
`slot`이 없는경우 기존 마크업은 무시됨    

## 4.3 render(createElement, error)
기존 javascript를 이용해서 생성하던 태그들을 완전히 대체할 수 있음    
첫번째인자는 createElement메소드임    
요거는 추가로 공부필요함.. 어느정도는 이해했는데 완벽하게 이해를 못한부분도 많음.. VNode라던지    
render()가 에러발생시 다른걸로 대체되고 error에 에러관련정보를 전송함

<br />
<hr />
<br />

# 5. 옵션/라이프사이클 훅
https://kr.vuejs.org/v2/api/#Vue-observable

<br />
<hr />
<br />

# 4. 옵션들

<br />
<hr />
<br />

# 4. 옵션들

<br />
<hr />
<br />

# 모르겠다
1. 2.1 Vue.extend(option)
2. 2.2 Vue.nextTick( [callback, context] )
3. 2.10 Vue.compile( template )
4. 2.11 Vue.observable (객체)