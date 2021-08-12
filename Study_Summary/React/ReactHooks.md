# React-Hooks정리
[리액트공식홈페이지](https://ko.reactjs.org/docs/hooks-intro.html) 읽고 정리한거    
버전 16.8.0이상부터 안정적으로 사용가능   

## 1. Hook
함수안에서 `state`등 다른 기능들을 사용할 수 있게 해줌
+ Hook함수 사용 조건
    1. 훅은 반드시 최상위레벨에서만 호출해야함
    2. Hook함수 실행에 반복문이나 조건문 사용 X 
    3. 함수컴포넌트 내에서만 호출해야함
+ 같은 Hook함수가 여러개 호출되어도 올바른 상태 유지 방법
    + 항상 동일한 순서로 Hook함수가 호출되므로 순서를 기억하고 실행함

### 1.1 useState
+ `useState()`로 생성한 변수는 함수가 끝나도 React에 의해 남아있음        
+ `useState()`의 반환값은 `생성할 변수`와 `생성할 변수를 갱실할 수 있는 함수`임
+ `useState()`의 인수는 `생성할 변수`의 `초기값`임
+ `useState()`는 컴포넌트가 랜더링될 때 `단 한번만 생성`됨

```javascript
import React from "react";

// const [변수명, 변수를 갱신할 함수명] = React.useState(변수초기값);
const [state, setState] = React.useState();
```

### 1.2 useEffect
+ 컴포넌트가 랜더링된 이후에 어떤 일을 수행해야하는지를 지정함
+ 기본적으로는 랜더링이후 그리고 모든 업데이트시 실행함
+ 랜더링될 때마다 전달하는 함수가 다름
+ 다음 `useEffect()`를 실행하기전에 이전 `useEffect()`의 clean-up을 처리함
+ 두번째 인자 사용시 배열내부에 들어가는 값이 변했을 경우에만 `uesEffect()`와 `clean-up`이 실행됨
+ 두번째 인자는 최적화를 위해 사용하며 `useEffect()`내에서 사용하는 모든 값들을 넣어줘야함 ( 안그러면 값이 일치하지않음 )
    + 값이 일치하지않는다는 것을 이전 값을 가지고 `useEffect()`를 실행한다는 것
+ 실행순서
    1. 랜더링 실행해야함
    2. `useEffect()`실행해야함을 기억함
    3. DOM을 업데이트함
    4. 랜더링을 완료함
    5. 기억했던 `useEffect()`를 실행함

```javascript
import React from "react";

React.useEffect(() => {
    // 컴포넌트 랜더링된 이후에 실행
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    
    // 컴포넌트가 마운트 해제될 때 실행 ( clean-up )
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, [props.frined]);
  // useEffect()내부에서 사용하는 값을 배열에 인자로 넘겨줘야함
  // 배열의 인자의 값이 이전값과 다를때만 useEffect()와 clean-up이 실행됨 
```

### 1.3 사용자 정의 Hook
+ 서로 다른 컴포넌트에서 공통된 코드를 추출해서 함수로 만든 것을 의미한다고 생각함
+ 이름은 반드시 `use`로 시작해야함
+ 사용한 컴포넌트에서 독립적으로 존재함 ( state나 effect를 공유하지않음 )
+ return 제외하고 사용자정의Hook함수 그대로 사용할 컴포넌트에 넣은것과 정확히 같은 동작을 함

```javascript
import React from "react";

// 사용자 정의 Hook ( 관습적으로 use로 시작 )
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  React.useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;  // 요거제외하고 위쪽코드 컴포넌트에 넣은것과 완벽하게 일치하게 동작함
}

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);    // 사용자 정의 Hook함수 사용

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

### 1.4 useContext


### 1.5 useReducer
### 1.6 useCallback
### 1.7 useMemo
### 1.8 useRef
+ `const refInput = React.useRef(초기값)`   
+ `React.useRef()`로 생성된 값은 컴포넌트의 전 생애주기에 값이 유지됨   
+ 순수한 자바스크립트 객체를 생성함
+ `React.useRef()`가 변한다고 해서 랜더링되지 않음    

### 1.9 useImperativeHandle


### 1.10 useLayoutEffect


### 1.11 useDebugValue
