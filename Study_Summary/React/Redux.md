[여기](https://lunit.gitbook.io/redux-in-korean/) 참고

# Redux
상태관리도구지만 리액트에 국한된것은 아님   
state를 관리하는 도구   

## 설치할것
`redux`는 기본적으로 객체형식만 받을 수 있음    
다른 형식도 받을 수 있게 해주기위해 추가 미들웨어(?)을 설치
```
npm i redux react-redux redux-promise redux-thunk
```
1. `redux-promise` : 리덕스에서 promise처리를 가능하게 해줌
2. `redux-thunk` : 리덕스에서 function을 받을 수 있게 해줌

## 1. Action
애플리케이션에서 스토어로 보내는 데이터 묶음    
실제 보내는 데이터 형태
```javascript
const ADD_TODO = "ADD_TODO";
const data = {      // 이 data를 dispatch()를 이용해서 전달
  type: ADD_TODO,      // type으로 어떤 액션이 실행될지 결정
  text: "할 일 추가",   // type외에 구조는 마음대로 결정
}
```
+ `dispatch()접근법`
  1. `store.dispatch()`이용
  2. `useDispatch`이용

## 2. Reducer
이전 `state`와 `action`을 받아서 새로운 상태를 반환하는 함수 ( 즉, `action`에 따라서 `state`를 수정 )    
계산외에 다른 어떠한 행위도 해서는 안됨 ( `state`변경, ajax사용 등등 )    

## 3. Store
`action`과 `reducer`를 가져오는 객체?   

