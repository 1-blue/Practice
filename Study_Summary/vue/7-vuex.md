# Vuex
복잡한 애플리케이션의 컴포넌트들을 효율적으로 관리하는 라이브러리   
컴포넌트의 데이터를 관리하기위한 상태 관리 패턴이자 라이브러리    

## 1. 사용할만한곳
1. 같은 데이터를 여러 view에서 사용하는 경우
2. 서로 다른 view끼리 데이터를 공유하는 경우

## 2. 등록방법
```javascript
Vue.use(Vuex);

const store = Vuex.Store({
  state: {
    // ...
  },
  mutation: {
    // ...
  },
  // ...
});

new Vue({
  el: "#app",
  store
});
```

## 3. 상태추적
기본적으로 `store.state`로 변경은 가능하지만 `store.commit('addNum')`처럼 commit을 이용해서 변경하면 추적이 가능해져서 디버깅에 유리함 

## 4. store
애플리케이션의 상태를 보유하고 있는 컨테이너이며, 반응형임    
직접적으로 변경할 수 없고, 커밋을 이용한 변경만 가능 ( 상태추적을 위해 )

## 5. state
data처럼 사용하며, 모든 컴포넌트가 공유할 수 있는 데이터임    
`this.$store.state.데이터이름`

## 6. getters
computed처럼 미리 연산된 값에 접근하는 속성   
`this.$store.getters("이름")`

## 7. mutations
1. methods사용처럼 사용
2. state값을 변경하는데 사용
3. 반드시 동기적이여야함
    + `devtool`에서 시작과 끝의 스냅샷을 저장하는데 비동기면 끝지점을 알 수 없기때문 ( 즉, 추적이 안됨 )
`this.$store.commit("이름", { 전달값들 })`

## 8. actions
비동기로직처리하는데 사용   
`this.$store.dispatch("이름", { 전달값들 })`

## 9. state, getters, mutations, actions예시
```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    doubleCount(state){
      return state.count * 2;
    },
    DoubleAddCount(state, getters){   // this.$store.getters("DoubleAddCount")
      return getters.doubleCount + 1;
    },
  },
  mutations: {                        // this.$store.commit({ type: "increment", number: 10 })
    increment(state, payload){        // this.$store.commit("increment", { number: 10 })
      state.count += payload.number; 
    }
  },
  actions: {                                // this.$store.dispatch()는 promise를 반환함
    secondIncrement(context, payload){      // this.$store.dispatch("secondIncrement", { time: 1 })
      setTimeout(() => context.commit("increment", { number: 10 }), 1000 * payload.time);
      // context.commit()
      // context.getters()
      // context.dispatch()
      // context.state.
    }
  }
})
```
## 10. 모듈
+ 기본적으로 `vue`는 단일트리를 사용해서 하나의 객체에 모든 값이 저장됨   
+ `Vuex`의 `module`을 사용하면 데이터를 여러개의 모듈로 구분할 수 있음    
+ 각 모듈은 자식 모듈을 가질 수 있음    
+ `namespaced: true`값을 가지면 루트네임스페이스 들어가지않고 자신의 네임스페이스를 가짐
```javascript
  const moduleA = {
    state: {
      data: 10,
    },
    mutations: {
      a(state){
        state.data++;
        console.log("A-mutations");
      }
    },
  }

  const moduleB = {
    state: {
      data: 20
    },
    mutations: {
      a(state){
        state.data++;
        console.log("B-mutations");
      }
    },
  }

  const moduleC = {
    namespaced: true,
    state: {
      data: 30
    },
    mutations: {
      a(state){
        state.data++;
        console.log("C-mutations");
      }
    },
  }

  // 중첩모듈예시 4, 5, 6
  const moduleD = {
    namespaced: true,
    state: {
      data: 40
    },
    mutations: {
      a(state){
        state.data++;
        console.log("C-mutations");
      }
    },
    modules: {
      moduleD_1: {
        state: {
          data: 50
        },
        mutations: {
          dFunction(state){     // this.$store.commit("d/dFunction")로 접근
            state.data++;
          }
        }
      },
      moduleD_2: {
        namespaced: true,
        state: {
          data: 60
        },
        getters: {              // this.$store.getters("d/moduleD_2/testFunc")로 접근
          testFunc(state, getters, rootState, rootGetters){
            // ...
          }
        },
        mutations: {        
          testFunc(state){      // this.$store.commit("d/moduleD_2/testFunc")로 접근
            // ...
          }
        },
        actions: {              // this.$store.dispatch("d/moduleD_2/testFunc")로 접근
          testFunc(context){
            // context.state
            // context.commit()
            // context.dispatch()
            // context.getters()
            // context.rootGetters()
            // context.rootState
          }
        }
      },
    }
  }

  export const store = new Vuex.Store({
    modules: {
      a: moduleA,
      b: moduleB,
      c: moduleC,
      d: moduleD,
    }
  });
```
1. 기본적으로 데이터는 분리가됨 ( 이름으로 각각 접근됨 )
```javascript
this.$store.state.a.data;   // 10
this.$store.state.b.data;   // 20
this.$store.state.c.data;   // 30
```
2. mutations, actions, getters는 전역 네임스페이스에 등록됨   
3. `namespaced: true`지정시 mutations, actions, getters들이 자신의 네임스페이스를 가지게됨
``` javascript
this.$store.commit("a");                        // A-mutations, B-mutations
this.$store.commit("c/a");                      // C-mutations ( 하위네임스페이스접근법 - 1 )
this.$store.commit("a", null, { root: true });  // C-mutations ( 하위네임스페이스접근법 - 2 )
```
4. 중첩모듈사용가능
    + 중첩모듈은 부모의 네임스페이스를 상속받으며, 자식이 `namespaced: true`로 설정하면 부모네임스페이스에 자식네임스페이스가 합쳐짐
5. `state`, `context`인수는 자신의 네임스페이스 존재하는 값을 가짐
6. 중첩 구조시 각각의 인수들
    + 중첩구조시 mutations는 state만 가짐
    + getters는 state, getters, rootState, rootGetters순서대로 변수가짐
    + actions는 context에 rootGetters, rootState가 들어가 있음

## 11. helper함수
컴포넌트에서 vuex를 간단하게 사용하기위한 헬퍼함수
```javascript
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default{
  name: "TestComponent",
  computed: {
    // num(){ return this.$store.state.num }와 같음.. 단 변수가많을경우 더 간단하게 사용할 수 있으므로 효율적
    ...mapState(["num"]),         // this.num 접근
    // 컴포넌트에서 다른 이름을 사용하고 싶을경우 ...mapState({ n: "num"})과 같은 형식으로 사용하면됨
    ...mapGetters(["doubleNum"]), // this.doubleNum
  },
  methods: {
    ...mapMutations(["onClickBtn"]),  // this.onClickBtn
    ...mapActions(["asyncClickBtn"]), // this.asyncClickBtn
  }
}
```

## 추가 공부할것
https://vuex.vuejs.org/kr/guide/structure.html

## Vuex쇼핑카트 예제 공부할거
https://xn--xy1bk56a.run/vuex/0-intro/