# react-router
1. [여기](https://velopert.com/3417) 참고
2. [여기](https://velog.io/@pkbird/React-Router-1) 참고

## 0. `<BrowserRouter>`와 `<HashRouter>`

## 1. `<Route>`
1. `path`경로에 해당하는 컴포넌트만 랜더링해줌
2. `exact`를 사용하면 `path`에 정확하게 일치하는 라우터만 랜더링함 ( 사용안하면 일부만 일치해도 랜더링해줌 )
3. `component`는 랜더링해줄 컴포넌트를 적어주면됨 ( `render={<h1>랜더링<h1>}`이런것도 가능 )
```html
<Route exact path="/" component={Home} />
```

## 2. `<Switch>`
`<Route>`중 제일처음 만족하는 `<Route>`의 컴포넌트만 랜더링함
```javascript
import { Route, Switch } from 'react-router-dom';
import { Home, About } from 'pages';

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about/:name" component={About} />
  <Route path="/about" component={About} />
</Switch>
```

## 3. `<Route>`로 접근한 컴포넌트
`<Route>`로 설정한 컴포넌트는 3가지의 `props`값을 전달받음
+ `history`: `push`, `replace`로 다른 경로이동가능
+ `location`: 현재 경로에 대한 정보, URL쿼리를 가짐
+ `match`: 매칭된 라우트정보, params정보를 가짐   

자세한건 `react-devtools`를 이용해서 각 props에 내려온 데이터 보고 사용하면됨  

## 4. withRouter
`HOC`이며 라우터로 사용되지않은 컴포넌트에서도 `match`, `history`, `location`사용 가능하게 해줌

## 5. `<Link>`와 `<NavLink>`
1. `<Link to="">`를 이용해서 `<a href="">`처럼 사용가능 ( 단, 완전히 같지않음 `<a>`사용시 페이지 리랜더링됨 )
2. `<NavLink to="" activeStyle={}>`처럼 사용하며 `active`상태일 때 스타일이 지정됨
  + `activeClassName`으로 클래스지정도 가능

```javascript
import React from "react";
import { NavLink, Link } from "react-router-dom";
import "@/css/link.css";

function Menu() {
  const activeStyle = {
    color: 'green',
    fontSize: '2rem'
  };

  return (
    <ul>
      <li>
        <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink >
      </li>
      <li>
        <NavLink to="/about" activeClassName={activeLink}>About</NavLink>
      </li>
      <li>
        <Link to="/about/foo">About Foo</Link>
      </li>
    </ul>
  );
}
```

## useParams()