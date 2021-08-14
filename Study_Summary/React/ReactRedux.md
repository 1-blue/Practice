[redux공식문서](https://ko.redux.js.org/introduction/getting-started/) 참고    
[react-redux관련 설명해준 블로그](https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6) 참고    

# Redux
상태관리도구지만 리액트에 국한된것은 아님   
state를 관리하는 도구   

## 설치할것
`redux`는 기본적으로 객체형식만 받을 수 있음    
다른 형식도 받을 수 있게 해주기위해 추가 미들웨어를 설치
```
npm i redux react-redux redux-promise redux-thunk
```
1. `redux-promise` : 리덕스에서 promise처리를 가능하게 해줌
2. `redux-thunk` : 리덕스에서 function을 받을 수 있게 해줌

## 기본형태
```javascript
// redux를 reducer, action, type, store파일별로 나누지않고 한번에 작성한것
const redux = require("redux");
const reduxThunk = require("redux-thunk);
const { createStore, applyMiddleware, combineReducers } = redux;

// type
const ADD_NUMBER = "ADD_NUMBER";
const ADD_VIEW = "ADD_VIEW";

// actions
const actionNumber = () => {
  return {
    type: ADD_NUMBER,
  }
}
const actionView = () => {
  return {
    type: ADD_VIEW,
  }
}

// reducers
const reducerNumber = (state = { count: 0 }, action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return {
        ...state,
        number: state.number + 1,
      }

    default:
      return state;
  }
}
const reducerView = (state = { view: 0 }, action) => {
  switch (action.type) {
    case ADD_VIEW:
      return {
        ...state,
        view: state.view + 1,
      }

    default:
      return state;
  }
}

// store
// reducer합치기
const reducer = combineReducers({
  number: reducerNumber,
  view: reducerView,
});
const store = createStore(reducerNumber, applyMiddleware(reduxThunk));
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

// 1. store.getState(): 현재 상태를 가져옴
// 2. store.dispatch(action): action에 맞는 행위를 실행함
// 3. store.subscribe(()=> { 상태변경시마다 실행 }): store의 상태가 변경될 때 마다 실행함

store.subscribe(() => {
  console.log("subscribe >> ", store.getState());
});

store.dispatch(actionNumber());
store.dispatch(actionNumber());
```

## 키워드
### 1. Store
redux의 전체적인 상태를 관리하는곳    
하나의 커다란 Object라고 생각하면 될것같음    

### 2. Action
`Store`의 값을 변경하기 위해 거쳐야할곳   
`Reducer`에서 적용할 행위와 추가적인 데이터를 전송함    
```javascript
// 반드시 작성해야하는 type에 행위
// payload에 전달할값을 넣어서 전달함

async userAction(body){
  const response = await axios.post("/auth/login", body);

  return {
    type: "LOGIN_USER",
    payload: response,
  }
}
```

### 3. Reducer
이전`State`와 `Action`을 받아서 새로운 `State`를 반환하는 함수 ( 즉, `이전State` + `Action` => `새로운State` )
계산외에 다른 어떠한 행위도 해서는 안됨 ( `State`변경, ajax사용 등등 )    
```javascript
// 이전 Store의 State값이 prevState로 들어옴
// 위 userAction에서 전달한값이 action에 들어옴

const userReducer(prevState={}, action){
  switch(action.type){
    case "LOGIN_USER":
      return {
        ...prevState,
        action.payload,
      }
    default:
      return prevState;
  }
}
```

### 4. 실행순서
1. 특정 `component`에서 store의 값을 변경시키기위해 `Action`실행 및 `Reducer`에 결과값 전달   
2. `Reducer`에서 `Store`에 저장된 이전 `State`값과 방금 받은 `Action`의 값을 이용해서 새로운 `State`값을 계산함   
3. 새로운 `State`값을 `Store`에 업데이트함    
4. 업데이트된 `Store`를 이용해서 `component`를 랜더링함   

## 추가정보

### 1. combinReducers
`Reducer`들을 합쳐서 하나의 `Reducer`를 만듦
```javascript
import { combineReducers } from 'redux';
import { userReducer, viewReducer } from "./reducer";

const rootReducer = combineReducers({
  user: userReducer,
  view: viewReducer,
});
```

### 2. connect
`component`자체적으로 `redux`를 사용하는것은 불가능해서 `connect`라는 HOC를 이용함    
```javascript
// connect()의 인수로 mapStateToProps를 정의해서 넘겨주면 해당 컴포넌트의 props로 특정 state값이 들어옴
// connect()의 인수로 mapDispatchToProps 정의해서 넘겨주면 해당 컴포넌트의 props로 특정 dispatch함수가 들어옴

import { connect } from "react-redux"

import { addSubscriber } from "../store/actions/subscriber";

function Subscribers({ subscriber, dispatchAddSubscriber }){
  // ...
}

const mapStateToProps = state => ({ subscriber: state.subscribers.subscriber })

const mapDispatchToProps = dispatch => {
  return {
    dispatchAddSubscriber() {
      dispatch(addSubscriber())
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(Subscribers);
```

### 3. useDispatch
`react-redux`의 `Dispatch`훅스    
`Dispatch`간단하게 사용가능   

```javascript
import { useDispatch } from "react-redux";

import { addSubscriber } from "../store/actions/subscriber";

const dispatch = useDispatch();

dispatch(addSubscriber())
```

### 4. useSelector
`react-redux`의 `State`훅스    
`State`간단하게 사용가능   

```javascript
import { useSelector } from "react-redux";

const user = useSelector(state => state.user.userData);
```

### 5. connect와 Hooks의 차이점
connect는 props로 전달되기때문에 props의 값이 변경되지않으면 리랜더링되지않지만,    
hooks를 사용할경우 useMomo()를 사용해야 변경될경우에만 리랜더링됨

