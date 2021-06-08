# vue-style-guide
[뷰스타일가이드](https://kr.vuejs.org/v2/style-guide/index.html) 읽고 내맘대로 정리하는 문서    

# 1. 우선순위 A (필수)
예외상황이 존재하겠지만 매우 드물며 자바스크립트와 뷰에 대한 전문 지식필요

## 1.1 컴포넌트 이름 합성어 사용
+ todo (X)
+ todo-item (O)
두 단어 이상을 결합해서 컴포넌트 이름을 짓자

## 1.2 컴포넌트 데이터
반드시 Object를 반환하는 함수여야함 ( 서로다른 객체에서 데이터공유문제때문 )

## 1.3 props정의
props는 가능하면 상세하게 정의하기
```javascript
props: ['data']   // X

props: {          // O
  data: {
    type: String,
    require: true,
    dafault: "blue",
    validator(v){
      return v;
    }
  }
}
```

## 1.4 v-for에 key지정 필수


## 1.5 v-for과 v-if같이사용하지말기
```javascript
// 현재 데이터
data(){
  return{
    users: [
      { id: 1, isActive: false },
      { id: 2, isActive: true },
      { id: 3, isActive: true },
    ]
  }
},
computed(){
  userActive(){
    return this.users.filter(user => user.isActive)
  }
}
```
``` html
<!-- 나쁜예 -->
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```
``` html
<!-- 좋은예 -->
<ul>
  <li v-for="user in userActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```
v-for돌면서 조건체크해서 출력하지말고 애초에 v-for도는애는 computed로 필터링해서 반복시키기   
+ 이점) 변경사항이 있는 배열만 랜더링함

## 1.6 스타일 스코프
`<style scoped>`사용

## 1.7 Private속성 이름
다른 사람의 코드와 충돌을 피하려면 `$_`접두어를 사용하자    
`$`와 `_`는 이미 vue에서 사용중

<br />
<hr />
<br />

# 2. 우선순위 B (매우추천)
가독성 향상을 위해 추천

## 2.1 컴포넌트 파일
```javascript
// 나쁜예
Vue.component('TodoList', {
  // ...
})

// 좋은예
components/
|- TodoList.js
|- TodoItem.js
```
뭔소린지모르겠음

## 2.2 싱글 파일 컴포넌트 이름 규칙 지정
단일 파일 구성 요소의 파일 이름은 항상 PascalCase 또는 항상 케밥 케이스 여야합니다.

## 2.3 베이스 컴포넌트 이름
응용 프로그램 고유의 스타일과 규칙을 적용 자료 구성 요소는 모두 같은 특정 접두사로 시작해야합니다 (Base, App)

## 2.4 싱글 인스턴스 컴포넌트 이름
페이지당 한번씩 사용되는 컴포넌트이름앞에 `The`붙이기

## 2.5 강한 연관성을 가진 컴포넌트 이름
부모와 연관된 컴포넌트들의 이름에는 부모의 구성요소이름을 접두사로 포함하기
```javascript
// 나쁜예
components/
|- TodoList.vue
|-- TodoItem.vue
|--- TodoButton.vue

// 좋은예
components/
|- TodoList.vue
|-- TodoListItem.vue
|--- TodoListItemButton.vue
```

## 2.6 셀프 클로징 컴포넌트
```html
<!-- 나쁜예 -->
<MyComponent></MyComponent>
<my-component/>

<!-- 좋은예 -->
<MyComponent/>
<my-component></my-component>
```

## 2.7 전체 이름 컴포넌트 이름
컴포넌트이름은 약어보단 전체이름을 사용하는 것이 좋음

## 2.8 다중 속성 엘리먼트
여러 속성이 있는 태그인경우 한줄에 하나의 속성이 들어가도록 줄바꿈 하는것이 좋음
```html
<!-- 나쁜예 -->
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">

<!-- 좋은예 -->
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

## 2.9 템플릿에서 단순한 표현식
`{{ 9 * 9 + 2 / 3 }}`같은짓하지말고 `computed`나 `methods`를 이용해서 사용하자

## 2.10 단순한 계산된 속성
```javascript
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice() {
    return this.basePrice - this.discount
  }
}
```
요론식으로 하나하나 분할해서 사용하자  ( 미래의 나를 위해서 )

## 2.11 속성 값에 따옴표
공백이 아닌 속성값에 따옴표 없어도 되긴하지만 그냥 무조건 사용하자

## 2.12 축약형 디렉티브
쓸거면 쓰고 안쓸거면 안쓰고 통일해서 사용하자     
+ `:` v-bind
+ `@` v-on
+ `#` v-slot

<br />
<hr />
<br />

# 3. 우선순위 C (추천)
선택의 혼란 또는 판단 오버헤드 최소화

## 3.1 컴포넌트/인스턴스 옵션 순서
1. 사이드 이펙트(Side Effects) (컴포넌트 외부에 효과가 미치는 옵션)
    + el

2. 전역 인지(Global Awareness) (컴포넌트 바깥의 지식을 필요로 하는 옵션)
    + name
    + parent

3. 컴포넌트 유형(Component Type) (컴포넌트의 유형을 바꾸는 옵션)
    + functional

4. 템플릿 변경자(Template Modifiers) (템플릿이 컴파일되는 방식을 바꾸는 옵션)
    + delimiters
    + comments

5. 템플릿 의존성(Template Dependencies) (템플릿에 이용되는 요소들을 지정하는 옵션)
    + components
    + directives
    + filters

6. 컴포지션(Composition) (다른 컴포넌트의 속성을 가져와 합치는 옵션)
    + extends
    + mixins

7. 인터페이스(Interface) (컴포넌트의 인터페이스를 지정하는 옵션)
    + inheritAttrs
    + model
    + props/propsData

8. 지역 상태(Local State) (반응적인 지역 속성들을 설정하는 옵션)
    + data
    + computed

9. 이벤트(Events) (반응적인 이벤트에 의해 실행되는 콜백을 지정하는 옵션)
    + watch
    + 라이프사이클 이벤트 (호출 순서대로 정렬)

10. 비반응적 속성(Non-Reactive Properties) (시스템의 반응성과 관계 없는 인스턴스 속성을 지정하는 옵션)
    + methods

11. 렌더링(Rendering) (컴포넌트 출력을 선언적으로 지정하는 옵션)
    + template/render
    + renderError

## 3.2 엘리먼트 속성 순서
1. 정의(Definition) (컴포넌트 옵션을 제공하는 속성)
    + `is`

2. 리스트 렌더링(List Rendering) (같은 엘리먼트의 변형을 여러 개 생성하는 속성)
    + `v-for`

3. 조건부(Conditionals) (엘리먼트가 렌더링되는지 혹은 보여지는지 여부를 결정하는 속성)
    + `v-if`
    + `v-else-if`
    + `v-else`
    + `v-show`
    + `v-cloak`

4. 렌더 변경자(Render Modifiers) (엘리먼트의 렌더링 방식을 변경하는 속성)
    + `v-pre`
    + `v-once`

5. 전역 인지(Global Awareness) (컴포넌트 바깥의 지식을 요구하는 속성)
    + `id`

6. 유일한 속성(Unique Attributes) (유일한 값을 가질 것을 요구하는 속성)
    + `ref`
    + `key`
    + `slot`

7. 양방향 바인딩(Two-Way Binding) (바인딩과 이벤트를 결합하는 속성)
    + `v-model`

8. 기타 속성 (따로 언급하지 않은 속성들)

9. 이벤트(Events) (컴포넌트 이벤트 리스너를 지정하는 속성)
    + `v-on`

10. 내용(Content) (엘리먼트의 내용을 덮어쓰는 속성)
    + `v-html`
    + `v-text`

<br />
<hr />
<br />

# 4. 우선순위 D (주의)
잠재적인 위험을 내포한 패턴

## 4.1 key가 없는 v-if/v-if-else/v-else
```html
<div
  v-if="error"
  key="search-status"
>
  Error: {{ error }}
</div>
<div
  v-else
  key="search-results"
>
  {{ results }}
</div>
```
v-if도 key와 같이 사용하는 것이 좋음

## 4.2 scoped에서 엘리먼트 셀렉터 사용
`<style scoped>`사용시 선택자를 class로 사용하는 것이 가장 속도가 빠름

## 4.3 부모-자식간 의사소통
this.$parent를 이용해서 데이터를 직접 변경하는것보단 props, emit을 이용해서 데이터통신권장

## 4.4 전역 상태 관리
`this.$root`나 `eventBus`를 이용하는 것보단 `Vuex`를 이용하는것이 좋음

<br />
<hr />
<br />

# 애매한거, 이해잘안가는것
1. 1.7 Private속성 이름
2. 2.1 컴포넌트 파일
3. 2.3 베이스 컴포넌트 이름