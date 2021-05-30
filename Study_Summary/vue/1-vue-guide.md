# vue공식문서 읽으면서 정리한것
https://kr.vuejs.org/v2/guide/index.html

# vue의 사상
## Reactivity
``` html
  <div id="app">
    <h1></h1>
  </div>

  <script>
    const $h1 = document.querySelector("h1");
    const obj = {};

    // 즉시실행함수
    (function() {
      function init(){
        Object.defineProperty(obj, 'str', {
          get() {
            console.log("접근");
          },
          set(value) {
            console.log("수정", value);
            render(value);
          }
        })
      }

      function render(value){
        $h1.textContent = value;
      }

      init();
    })()
  </script>
```
위 코드를 해석하면 `obj.str`이 변화할 때 마다 log찍어주고 set할 때 화면에 출력해줌        
즉, `obj.str`이라는 데이터가 변화할 때 마다 화면에 데이터변화를 반영시키는것 이것이 Reactivity임    
그리고 vue는 data에 Reactivity를 적용한것임   
vue의 data가 변화하면 자동적으로 화면에 그 변화가 적용됨      

## 기본개념
MVVM, SPA,
el태그를 찾음

## cdn
```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

<br />
<hr />
<br />

# 1. 디렉티브
v- 접두사가 붙는 특수 속성으로 단일 javaScript표현식만 사용가능

## 1.1 v-bind
반응형으로 동작하며 :으로 줄여쓸 수 있음

## 1.2 v-if
조건이 참이면 랜더링

## 1.3 v-show
항상 랜더링되지만 값에 따라서 display: none;이 적용됨

## 1.4 v-for
```javascript
<li v-for="(value, key, index) in object" :key="index">   // in은 객체의 프로퍼티
<li v-for="item of object" :key="index">                  // of는 인덱스
<li v-for="index of 10" :key="index">                     // 정수로 반복가능 (range v-for)
```

## 1.5 v-on
@로 줄여쓰기 가능
@click : 클릭이벤트추가

## 1.6 v-model
양방향 바인딩
여러 태그에 사용시 배열로 값이 들어가고 먼저 넣은 순서대로 들어감
```javascript
<input v-model="someValue" />
<input v-bind:value="someValue" v-on:input="someValue = $event.target.value" />
// 위 두문장은 정확하게 같은문장임 (v-model의 원리)
```

+ .number, .trim
```javascript
<input v-model.number="age" type="number">  // 숫자로 자동변환
<input v-model.trim="msg">                  // trim적용
```

## 1.7 v-once
한번 렌더링된 후 캐싱됨   
{{}}로 사용한 변수는 업데이트되지않음

## 1.8 v-html
HTML텍스트 그대로를 html로 사용.. (데이터바인딩 무시됨) **XSS 취약**

<br />
<hr />
<br />

# 2. data
Vue인스턴스 생성시 data객체에 있는 모든 속성이 Vue의 반응형 시스템에 추가됨

## 2.1 예시
```javascript
const data = { fruit: "apple" };
const vm = new Vue({
  data: data,
});
if(vm.fruit === data.fruit)   // true
```
vm.fruit나 data.fruit를 바꿔도 서로가 바뀜

## 2.2 예외
유일한 예외는 Object.freeze(data)를 적용시킬경우 기존속성이 변경되지않음

## 2.3 객체변경감지
기본적으로 Vue는 속성 추가 및 삭제는 감지하지 못함
하지만 명시적으로 추가하는 방법이 존재
```javascript
const vm = new Vue({
  data: {
    person: {
      name: "blue",
    }
  }
});
vm.person.age = 17;         // 감지못함
vm.set(person, age, 17);    // 감지함
```

## 2.4 data는 반드시 함수
함수로 리턴하는 형식을 지키지않으면 여러 컴포넌트를 사용시 같은 데이터를 공유하게됨
```javascript
data: function () {
  return {
    counter: 0
  }
}
```

<br />
<hr />
<br />

# 3. Lift-Cycle-hook
라이프사이클훅에서 this는 Vue객체를 가리킴

## 3.1 beforeCreate
Events & Liftcycle생성

## 3.2 created
injections & reactivity 생성

## 3.3 beforeMount
el & template 존재여부확인 및 생성
template컴파일

## 3.4 mounted

## 3.5 beforeUpdate
data변환시 호출
화면 render

## 3.6 updated
화면 render후 호출

## 3.7 beforeDestroy
wtchers & child & compnents & eventListner 제거전 호출

## 3.8 beforeCreate
wtchers & child & compnents & eventListner 제거후 호출

<br />
<hr />
<br />

# 4. computed와 watch
간단한 계산하는 문법일 때 사용하는 것이 좋음
computed는 data에 종속적이고
캐싱이 되므로 data값이 바뀔 때 값을 계산하고 저장해둠

## 4.1 computed getter/setter예시
```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
app.fullName                // getter사용
app.fullName = '고라니';    // setter사용
```

## 4.2 watch
대부분의 경우에는 watch보단 computed를 사용하는 것이 좋음
```javascript
var vm = new Vue({
  el: '#watch-example',
  data: {
    question: '',
  },
  watch: {
    // question이 변경될 때 마다 이 기능이 실행
    question: function (newQuestion) {
      this.answer = '입력을 기다리는 중...'
      this.debouncedGetAnswer()
    }
  },
});
```

<br />
<hr />
<br />

# 5. Component
미리 정의된 옵션을 가진 Vue 인스턴스
컴포넌트 이름은 반드시 kebab-case

## 5.1 전역등록
어떤 Vue인스턴스도 해당컴포넌트를 사용할 수 있음
```javascript
Vue.component('todo-item', {
	template: '<li>할일 항목 하나입니다.</li>',
});
```

## 5.2 지역등록
components속성을 이용해서 component를 등록한 component만 사용할 수 있음
```javascript
const aComponent = {
  template: "<li>할일 항목 하나입니다.</li>",
}
new Vue({
  components: {
    'a-component': aComponent,
  }
});
```

## 5.3 컴포넌트간의 데이터교환
컴포넌트끼리 자체격리된 범위가 존재함.
하위컴포넌트 <-> 상위컴포넌트로 직접적인 데이터 참조하면 안됨

## 5.4 동적컴포넌트
components에 여러 컴포넌트를 등록했다면 `<component v-bind:is="컴포넌트명"></component>`을 넣으면   
컴포넌트명이 변경될 때 마다 새로 컴포넌트를 생성, 삭제함

## 5.5 keep-alive사용
```html
<keep-alive>
  <component v-bind:is="name"></component>
</keep-alive>
```
동적컴포넌트를 keep-alive태그사이에 넣으면 기존 컴포넌트가 캐싱됨

## 5.6 비동기컴포넌트
```javascript
const AsyncComponent = () => ({
  // 로드 할 컴포넌트(Promise여야 합니다.)
  component: import("./MyComponent.vue"),

  // 비동기 컴포넌트가 로딩중일 때 사용할 컴포넌트
  loading: home,

  // 비동기 컴포넌트 로딩이 실패했을 때 사용할 컴포넌트
  error: myComponent,

  // 로딩 컴포넌트를 보여주기 전의 지연시간. (기본값: 200ms)
  delay: 200,

  // 초과되었을 때 에러 컴포넌트를 표시할 타임아웃. (기본값: 무한대)
  timeout: 3000
});
```

## 5.7 props
상위컴포넌트 -> 하위컴포넌트로 데이터전달하기 위한 방법   
+ 단방향데이터흐름
부모 -> 자식은 가능하지만 자식 -> 부모는 안되도록 vue에서 막음   
부모의 prop값이 변경되면 자동적으로 자식의 prop값이 최신값으로 업데이트됨
```javascript
// 상위컴포넌트
<child message="안녕하세요!"></child>
// 하위컴포넌트
{
    props: ["message"],
    methods: {
      showMessage(){
        console.log(this.message);    // 안녕하세요!
      }
    }
}
// 하위컴포넌트에서 속성값으로 props: ['message']로 받으면 this.message로 사용가능
// 단, 사용할 때 반드시 kebab-case로 사용해야함 ( my-message같은 형식 )
```

## 5.8 props 문자이외에 자료형 전달
props로 전달되는 것은 문자임
문자이외의 자료형으로 전달하기위해서는 v-bind를 붙이면됨
```html
<child props-data="1"></child>                      // 문자 "1"
<child v-bind:props-data="1"></child>               // 숫자 1
<child v-bind:props-data="true"></child>            // boolean true
<child v-bind:props-data="[1, 2, 3]"></child>       // array [1, 2, 3]
<child v-bind:props-data="{a: 'apple'}"></child>    // object {a: 'apple'}
<child v-bind:props-data="[1, 2, 3]"></child>       // array [1, 2, 3]
```

## 5.9 props 객체전달
객체를 props로 전달할 때는 인자없이 v-bind로 전달가능 ( 단 오브젝트의 모든 속성값이 전달됨 )
```javascript
const todo = { fruit: "apple" };
<child v-bind="todo"></child>     // { fruit: "apple" }전달
```

## 5.10 props 전달특징
객체나 배열은 참조로 전달되므로 하위에서 바꾸면 상위에도 영향을 끼침

## 5.11 prop 데이터 변경
직접적으로 변경하지말고 data나 computed를 이용해서 값을 받아서 다른변수에서 변경
https://kr.vuejs.org/v2/guide/components-props.html#%EB%8B%A8%EB%B0%A9%ED%96%A5-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%9D%90%EB%A6%84

## 5.12 props 검증
```javascript
props: {
  a: {
    type: [타입1, 타입2],
    require: true,        // 반드시필요
    default: 100          // 기본값설정
    validator(value){     // 10보다 큰지 확인 (사용자정의 유효성검사)
      return value > 10;
    }
  }
}
```
type : String, Number, Boolean, Function, Object, Array, Symbol   
require : 필수여부 지정   
default : 기본값지정    
validator : 사용자정의 유효성검사   
**검증에 실패할경우 콘솔에 주의 메시지를 띄움**   

## 5.13 prop아닌 속성, 상속 비활성화
1. inheritAttrs: true   
자식의 props속성에 정의되지않은 속성값은 root요소의 속성으로 자동추가됨   
이것을 막는방법은 자식컴포넌트에 'inheritAttrs: false' 부여 (기본값 true)   
2. $attrs   
$attrs를 이용하면 원하는곳에 상속받은 속성값을 부여할 수 있음   
v-bind="$attrs" 를 사용하면 자식의 태그에 부모가 전달했지만 정의되지않은 속성값들이 들어감    

## 5.14 .native
자식에서 부모의 이벤트를 호출하고 싶을 때 사용 - 1
```html
<my-component @click.native="clickTest"></my-component>
```
자식의 root-element에 바로 이벤트가 등록됨    
단 자식의 루트태그에 이벤트가 걸리는거라서 자식컴포넌트 전체에 이벤트가 걸리는 것임   
특정 element에 등록하고 싶다면 **5.15** 참고

## 5.15 custom컴포넌트 이벤트등록
자식에서 부모의 이벤트를 호출하고 싶을 때 사용 - 2    
기본적으로 this.$listeners에 부모에게 물려받은 모든 이벤트들이 들어있음.
```html
<my-component @click="clickTest" @blur="blurTest"></my-component>
```
my-component의 $listeners에는 { click: clickTest, blur: blurTest }가 존재함 (물론 함수형태로 존재)   
이것을 자식에서 사용하는 방법은 computed속성을 이용해서 사용하는것이 좋음
``` javascript
computed: {
  listeners(){
    const { input, click, ...listeners } = this.$listeners;
    const c = { click };    // 부모측에서 등록한 클릭이벤트 즉, clickTest임
    return c
  }
},
```
만약 부모에게서 받은 이벤트중 일부만 사용하기위해서는 위처럼 이벤트를 뽑아내서 객체로 만들어서 리턴면되고   
전체를 사용하려면 spread문법을 이용해서 그 자체를(listeners) 리턴하면됨   
사용시에는 v-on="listeners" 형태로 사용   

# 6. events
자식 -> 부모에게 신호전송
```javascript
// 자식
this.$emit('update:myEvent', value);   // 부모의 update:myProp에게 신호전송, 두번째인자까지주면 데이터도 전송

//부모
<child v-on:update:myEvent="testFunc">xxx</child>   // testFunc실행
```
자식측에서 $emit으로 신호를 보내면 부모측에서 v-on으로 이벤트대기하다가 받아서 실행   
**vue에서 update:[event이름]으로 사용하는것을 권장함**

## 6.1 .sync
```html
// 일반적 (emit으로 보낸 변수 title에 넣기) 근데 $event애가 왜 값을 갖는건지 뭐하는앤지 모르겠음
<my-component v-on:update:title="title = $event"></my-component>

// .sync를 사용하면 위와 같은 경우를 축약형으로 사용가능
<my-component v-bind:title.sync="title"></my-component>   // 위와 같이 동작함
```
단, v-bind와 .sync는 같이 동작하는것은 아님

## 7. eventBus
부모자식관계가 아닌 다른 관계일경우 데이터 or 신호전달방법
``` javascript
// 비어있는객체로 버스생성
const bus = new Vue();

// 출발지
bus.$emit('id:selected', 1);

// 도착지
bus.$on('id:selected', function (id) { ... });

// 버스사용끝나면 off
bus.$off("id:selected");
```
복잡한걸 해결할때는 상태관리패턴이용 store, state, ...

# 7. slot
부모가 전달하는 태그가 없으면 slot이 출력되고 있으면 부모가 전달한게 출력됨
```javascript
const compo = {
  template: `
    <div>
      <h1>>자식</h1>
      <slot>                              // 부모태그내부에 값이 존재해서
        <span>아무것도 없으면 보임</span>  // <div>aaa</div>로 대체됨
      </slot>
    </div>
    `
}
<compo>
	<div>aaa</div>   // compo내부에 내용이 존재하면 자식의 slot태그사이에 aaa출력 아니면 slot태그 내부태그출력
</compo>
```

## 7.1 name속성, v-slot
v-slot속성에 맞는 name속성이 렌더링됨
v-slot에 둘러싸여있지않으면 자동으로 v-slot:default가 됨
```html
// 부모
<template v-slot:header>
  <h1>header - 1</h1>
</template>
<template v-slot:default>
  <p>body - 1</p>
</template>

// 자식
<slot name="header">header</slot>
<slot>body</slot>
```

## 7.2 slot에서 부모가 자식데이터 사용
```html
// 부모
<template v-slot:header="data3">
   <h1>{{ data3.data1 }}</h1>
</template>

// 자식
<slot name="header" v-bind:data1="data2">
  {{ x }}
</slot>
```
자식의 "data2"를 "data1"이라는 이름으로 부모에게 전송... ( 부모는 "data3"이라는 이름으로 받음 )   
단, v-slot:default 즉 name이 없을경우 v-slot="data3"과 같이 축약가능    
+ 축약형과 name이 있는경우를 같이사용할경우에는 축약형을 명시적으로 default로 적어줘야함    

## 7.3 v-slot 속성 구조분해할당
```javascript
v-slot:header="data3"   // data3는 구조분해할당이 가능함  ( const { id, name } = req.body; 같은거 )   
v-slot:header="{data: data3}" // rename가능   
v-slot:header="{data = { name: 'blue' }}" // undefined인경우 기본값지정도 가능 (undefined아닌경우 무시됨)   
```

## 7.4 가번슬롯이름
```javascript
const slotName = header;    
v-slot:[slotName]="data"    // 같은 형식도 가능
```

## 7.5 v-slot단축표기법
```javascript
v-slot:header="data"
#header="data"
```
위 두개는 같은 문장임 (v-slot: === #)   
단, default라고 #="data" 이러면 안됨

## 7.6 slot-scope (삭제예정)
```javascript
// 부모
<slot text="hello from child"></slot>

// 자식.. slot-scope속성을 가지는 컴포넌트, 태그에 사용가능
<template slot-scope="props">
  <span>hello from parent</span>
  <span>{{ props.text }}</span>
</template>
```

<br />
<hr />
<br />

# 8. 수식어
## 8.1 이벤트 수식어
이벤트에 붙이면 기능추가 및 삭제함
+ .stop
+ .prevent
+ .capture
+ .self
+ .once
+ .passive

## 8.2 키 수식어
해당키를 입력시 실행함
```html
<input @keyup.space="testFunc" />     // 해당키 입력시 실행
```
+ .enter
+ .tab
+ .delete (“Delete” 와 “Backspace” 키 모두를 캡처합니다)
+ .esc
+ .space
+ .up
+ .down
+ .left
+ .right

## 8.3 클릭 수식어
해당키를 누르고 클릭해야 실행함
```html
<span @click.space="testFunc" />                  // space키를 누르고 클릭해야만 실행
<span @click.shift.exact="testFunc">aaaa</span>   // 4가지중에 shift만 눌러야 실행
<span @click.exact="testFunc">aaaa</span>         // command안눌렀을 때만 실행
```
+ .ctrl
+ .alt
+ .shift
+ .meta (command)
+ .exact

<br />
<hr />
<br />

# 9. transition
transition으로 싸여진 엘리먼트가 삽입되거나 제거될 때 일어남

## 9.1 예시
```html
<transition name="test">
  <h1>title</h1>
</tansition>
```

아래의 클래스가 순차적으로 적용됨
1. .title-enter
2. .title-enter-active
3. .title-enter-to
4. .title-leave
5. .title-leave-active
6. .title-leave-to

+ enter  => 엘리먼트가 삽입될 때
+ leave  => 엘리먼트가 삭제될 때
+ active => 변화하는동안 적용
+ to     => 완료시 적용

## 9.2 사용자 지정 트랜지션 클래스
원본 트랜지션 클래스를 오버라이딩함 (enter, leave마찬가지)
enter-class   
enter-active-class    
enter-to-class    

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
<transition
  name="custom-classes-transition"
  enter-active-class="animated tada"
  leave-active-class="animated bounceOutRight"
>
```
기존에 v-enter방식을 버리고 enter-active-class에 정의된 클래스를 사용함

## 9.3 명시적 트랜지션 지속시간
:duration="{ enter: 500, leave: 800 }"    
css와 별개로 지정된 시간동안 지속됨

## 9.4 트랜지션내부에 같은 태그
같은이름의 태그가 존재할 때는 key를 이용해서 서로 다른 태그임을 알려줘야 트랜지션이 정상적으로 적용됨
```html
<transition name="a">
  <p v-if="show" key="h">hello</p>
  <p v-else="show" key="b">bye</p>
</transition>
```

## 9.5 트랜지션 모드
```html
<transition mode="모드명">
<transition name="a" mode="in-out">
  <p v-if="show" key="h">hello</p>
  <p v-else="show" key="b">bye</p>
</transition>   // show === true일 때
```
in-out : 새로운 엘리먼트완료후 현재엘리먼트 (hello적용 -> bye적용)    
out-in : 현재엘리먼트완료후 새로운 엘리먼트 (bye적용 -> hello적용)    
...? 반대아닌가

## 9.6 컴포넌트 트랜지션
```html
<transition name="a" mode="in-out">
  <component v-bind:is="show"></component>
</transition>
```
컴포넌트 트랜지션은 key값없이 동적컴포넌트로 사용하면됨

<br />
<hr />
<br />

# 10. mixin
컴포넌트를 합침 즉, 컴포넌트 재사용함을 의미    
mixins: [컴포넌트],   
훅(Hook)함수는 mixin이 먼저호출됨     
data or methods가 겹칠경우 현재 컴포넌트 데이터가 우선적으로 사용   

## 10.1 전역적 mixin
```javascript
Vue.mixin({
  template: `...`,
  created() {
    ...
  }
});
```
선언 이후에 생성되는 모든 컴포넌트에 적용됨 ( 주의필요 )

<br />
<hr />
<br />

# 11. 사용자 지정 디렉티브
사용자가 디렉티브를 만들 수 있음

## 11.1 전역 사용자지정디렉티브예시
```javascript
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
});
<input v-focus />   // 페이지 들어오면 자동적으로 포커스 들어감
```

## 11.2 훅함수
+ bind : 처음 엘리먼트에 바인딩될 때 한번호출
+ inserted : 바인딩된 엘림먼트가 부모노드에 삽입될 때 호출
+ update : 포함하는 컴포넌트가 업데이트될 때 호출
+ componentUpdated : 포함하는 컴포넌트와 자식들이 업데이트될 때 호출
+ unbind : 디렉티브가 엘리먼트로부터 언바인딩될 때 호출

### 11.2.1 훅함수의 인자
1. el : 디렉티브가 바인딩된 엘리먼트 (DOM조작가능)   
2. vnode : Vue컴파일러가 만든 버추얼노드   
3. oldVnode : 이전의 버추얼 노드   
4. binding : 속성을 가진 객체 `(예시 <div v-demo:foo.a.b="1 + 1">)`
+ name : 디렉티브의 이름       `( demo )`
+ value : 디렉티브의 전달값    `( 2 )`
+ oldValue : 이전값           `( 있는경우만 존재 )`
+ expression : 표현식         `( 1 + 1 )`
+ arg : 디렉티브전달인자       `( foo )`
+ modifiers : 수식어의 객체    `( { a: true, b: true } )`

```javascript
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>

Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +         // demo
      'value: '      + s(binding.value) + '<br>' +        // 2
      'expression: ' + s(binding.expression) + '<br>' +   // 1 + 1
      'argument: '   + s(binding.arg) + '<br>' +          // foo
      'modifiers: '  + s(binding.modifiers) + '<br>' +    // { a: true, b: true }
      'vnode keys: ' + Object.keys(vnode).join(', ')      // 
  }
})
```

<br />
<hr />
<br />

# 12. render
template이 아닌 javascript로 HTML을 작성할 때 사용함

## 12.1 $slots
$slots에 v-slot으로 넘기는 속성값이 들어있음
```html
<anchored-heading :level="1" v-slot:test>
  <div>Hello</div>
</anchored-heading>
```
자식) this.$slots.test()에 `<div>Hello</div>`가 들어있음 ( tag와 VNode로 나눠서 들어가 있음 )

## 12.2 render
``` javascript
render(createElement){
  return createElement(태그명, props or arrtributes, 작성내용);
}
```

### 12.2.1 render반환값
createElement : vue에서 사용하는 가상 DOM트리를 만드는 함수   
( 페이지에 랜더링해야하는 모든 하위노드의 설명을 포함하는 객체를 반환함 ( VNode라고부름 ) )

### 12.2.2 render(첫번째, 두번째, 세번째)전달인자
1. 첫번째   
생성할 태그명을 넣어줘야함, null이면 주석생성, 반드시 적어줘야함

2. 두번째   
사용할 이벤트나 속성값을 넣어줌 ( 없으면 생략가능 )
```javascript
{
    // v-bind:class와 같음
    class: { foo: true },

    // v-bind:style과 같음
    style: { color: 'red', },

    // HTML 속성
    attrs: { id: 'foo' },

    // 컴포넌트 props
    props: { myProp: 'bar' },

    // DOM속성
    domProps: { innerHTML: 'baz' },

    // 이벤트등록 (clickHandler는 부모컴포넌트의 함수)
    on: { click: this.clickHandler },

    // native이벤트
    nativeOn: { click: this.nativeClickHandler },

    // 사용자 지정 디렉티브
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],

    // 범위 지정 슬롯
    scopedSlots: {
      default: props => createElement('span', props.text)
    },

    // 이 컴포넌트가 다른 컴포넌트의 자식인 경우, 슬롯의 이름입니다.
    slot: 'name-of-slot',

    // 기타 최고 레벨 속성
    key: 'myKey',
    ref: 'myRef',

    // $ref.myRef
    refInFor: true
}
```
이벤트 수식어 및 접두어
+ .passive => &
+ .capture => !
+ .once => ~
+ .capture.once or .once.capture => ~!      
on: { [! or & or ~ or ~!]click: this.clickHandler }

3. 세번째   
VNode or 문자열 or VNode배열 or slot이 있는 객체
```javascript
render(createElement){
  return createElement(
    'div', 
    { },
    Array.apply(null, { length: 20 }).map(() => {
      return createElement('p', 'hi')
    })
  );
},
<div>
  <p>hi</p>
  <p>hi</p>
  ...
  <p>hi</p>
</div>
```
p태그 20생성하는 구문 ( VNode배열을 인수로 넘겨준것 )

## 12.3 functional, context인자
functional: true속성을 주면
render함수의 두번째 인자가 전송됨 ( context로 사용하는것이 전통 )
속성값으로 props, children, slots, scopedSlots, data, parent, listeners, injections가 있음
return createElement(태그명, context.data, context.children or context.slots().default)
context.data는 객체고 객체내부에 on이벤트나 속성값들이 정의되어있어서 바로사용하면됨 (특정속성값들 바로적용안되니까 확인해보기 class같은거 StaticClass에 들어있음)

<br />
<hr />
<br />

# 13. 플러그인
Vue.use(플러그인, { 옵션 })
Vue는 같은 플러그인이 있을경우 한번만 설치되게만듦

<br />
<hr />
<br />

# 0. 추가정보
## 0.1 동적전달인자
`<div @[event]="testFunc">click Me</div>`   
const event = 'click';    
이러면 @click이벤트가 등록됨    

## 0.2 템플릿문법
Mushache구문 사용   
{{ data명 }}    
{{}}에는 하나의 단일표현식만 사용가능 (if문, 변수선언문 등 사용 X)    

## 0.3 우선순위
v-for > v-if

## 0.4 .lazy
`<input v-model.lazy="msg" >`   
change이벤트 이후 동기화

## 0.5 $root
모든 하위컴포넌트에서는 루트컴포넌트에 접근가능   
$root안에 루트컴포넌트의 데이터가 들어있음

## 0.6 $parent
자식컴포넌트에서 부모컴포넌트 접근    
$parent에 부모컴포넌트의 데이터가 들어있음

## 0.7 $refs
부모컴포넌트에서 자식컴포넌트 접근    
ref속성부여시 $refs.ref속성명 으로 접근가능   
`<compo ref='spa'>`   
부모컴포넌트에서 $ref.spa로 자식컴포넌트 접근가능

## 0.8 provide, inject
자식의 자식같은 하위컴포넌트에게 데이터전달방법임 (모든하위컴포넌트에게 데이터전달)   
부모측에서 provide정의    
```javascript
provide(){
  return{
    rootData: this.data
  }
}
```
자식측에서 inject로 데이터받기    
`inject: ['rootData']`

## 0.9 컴포넌트 재귀호출
컴포넌트에 name값을 주고 그것을 호출하면 재귀호출가능   
```javascript
name: 'stack',
template: 
`
<div>
  <stack>
  </stack>
</div>
`
```
단, 무한루프발생가능성이 있으므로 분기처리 확실히 해줘야함

## 0.10 컴포넌트 순환참조
A를 정의하는데 B를 사용하고, B를 정의하는데 A를 사용하는 경우
https://kr.vuejs.org/v2/guide/components-edge-cases.html#%EB%91%90-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%82%AC%EC%9D%B4%EC%9D%98-%EC%88%9C%ED%99%98-%EC%B0%B8%EC%A1%B0

## 0.11 inline-template
컴포넌트 소속은 부모소속이지만 사용하는 데이터는 자식의 데이터 사용   
```javascript
<my-component inline-template>
  <div>
    <p>이는 컴포넌트 자신의 템플릿으로써 컴파일되었습니다.</p>
    <p>부모에 인용된 컨텐츠가 아닙니다.</p>
    {{ data }}      // my-component의 data
  </div>
</my-component>
```
root의 data => root   
myComponent의 data => myComponent   
{{ data }}의 값은 myComponent임   

## 0.12 foreceUpdate
업데이터 강제 (사용할경우 99.9% 어딘가 잘못된 코드임)

## 0.13 클래스 v-bind
ex) `<div v-bind:class="{ active: isActive }"></div>`
isActive가 참이면 active클래스 적용   

`<div v-bind:class="classObject"></div>`
1. classObject = { active: true };                // 객체
2. classObject(){ return { active: isActive } }   // 함수

객체, 함수, 삼항연산자, 배열 모두 클래스바인딩 가능

<br />
<hr />
<br />

# 요약
1. `$liseners`에는 부모에서 전송한 이벤트가 들어가 있음
사용하려면 원하는 이벤트 꺼내서 v-on으로 사용하면 된다.   

2. `$attrs`에는 부모에서 전송한 props가 아닌 속성값이 들어가 있음
사용하려면 원하는 속성만 꺼내서 혹은 전체에 v-bind로 사용하면 된다.
단, 자식의 루트엘리먼트에 속성값적용을 안하려면 `inheritAttrs: false`를 적용하면 된다.    

###### 이해안가는것
#### 2. $event?? 특별한변수라는데 애는 뭔지.. (event를 가지기도하고, emit의 변수를 가지기도하고)
#### 3. 트랜지션 필요할 때 다시공부하기 뛰어넘었음