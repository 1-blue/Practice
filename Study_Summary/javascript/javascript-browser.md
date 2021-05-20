https://ko.javascript.info/
두 번째 파트 - 브라우저에서의 자바스크립트

# Window
전역객체
브라우저를 대신해서 여러가지 정보를 담고 있음

# DOM
Document Object Model

# BOM
Browser Object Model

# 1. DOM트리
## 1.1 유명한 태그
1. `<html>` = document.documentElement
2. `<head>` = document.head
3. `<body>` = document.body

## 1.2 용어정리
1. 자식노드 : 바로 하위에 있는 노드
2. 후손노드 : 하위에 있는 노드

## 1.3 자식 / 후손노드들
### 1.3.1 텍스트, 주석노드들을 포함한 노드들 반환
* childNodes : 자식노드들
* firstChild : 첫번째 자식노드
* lastChild : 마지막 자식노드
* previousSibling : 이전 형제노드
* nextSibling : 이전 형제노드
* parentNode : 부모노드
### 1.3.2 요소노드만 반환
* children
* firstElementChild
* lastElementChild
* previousElementSibling
* nextElementSibling
* parentElement   ( 부모가 노드가 아니면 null반환 )

## 1.4 getElement / querySelector
### 1.4.1 id로 요소검색
``` html
<!DOCTYPE html>
<html lang="ko">
<head>
  <title>Document</title>
</head>
<body>
  <div id="id">
    hi
  </div>
  
  <div id="id-div">
    bye
  </div>
  
  <script>
    document.getElementById(id).backgrond = "red";
    id.backgrond = "red";                   // id는 전역변수로 접근가능
    widdow['id-div'].background = "red";    // 단 id-div처럼적은경우 window객체로 접근가능
  </script>
</body>
</html>
```
### 1.4.2 선택자로 요소검색
* querySelector()
* querySelectorAll()    // 가상클래스도 선택가능
### 1.4.3 matches
주어진 선택자와 일치하는지 검사
### 1.4.4 closest
자기자신을 포함한 선택자가 가장 가까운 조상을 반환
### 1.4.5 getElementBy*
이제는 안쓰는 태그들
* getElementsByTagName(tag)
* getElementsByClassName(className)
* getElementsByName(name)
이친구들은 중간에 태그가 늘어나면 그것까지 포함함 ( 참조 )
하지만 querySelector()는 중간에 늘어나도 최초 얻어왔을 때 태그들만 사용  ( 복사 )






# 나중에 정리할거
## nodeType
1. 요소노드 1
2. 텍스트노드 3
3. 문서객체 9

## nodeName
모드 노드에 사용가능하며, 노드의 이름을 출력해줌

## tagName
태그에만 사용가능

## innerHTML
요소내 HTML을 문자열형태로 받아옴... ( 쓰기도가능 )
`+=` 사용시 기존내용삭제 -> 기존내용 + 새내용추가

## nodeValue, data
nodeValue나 data나 별차이없음... 각 태그내의 텍스트노드를 보여줌
텍스트노드.data     // ( 쓰기도 가능, 주석노드에도 가능 )

## textContent
요소내 태그제외하고 텍스트만 출력해줌
태그노드.textContent

## hidden
`display: none;`와 동일함
태그노드.hidden = true;   // display: none; 적용

<hr />

## 태그속성과 프로퍼티
태그속성중에 표준속성은 DOM노드객체의 프로퍼티로 변환하지만 비표준속성은 변환되지않음  ( 태그마다 표준이 다르므로 태그마다 적용되는 프로퍼티가 다름 )

## 비표준속성 사용
* hasAttribute(name) : 속성 존재 여부 확인
* getAttribute(name) : 속성값을 가져옴
* setAttribute(name, value) : 속성값을 변경함
* removeAttribute(name) : 속성값을 지움

## 프로퍼티값 타입 예외
항상 프로퍼티의 타입이 문자열은 아님
* input.checked는 Boolean
* div.style은 Object

## dataset
속성명이 `data-*`형태라면 javascript에서 사용할 때
태그.dataset.*형태로 사용하면됨
단, 속성명에서 -으로 구분한것은 js에서 대문자로 구분
``` html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>Document</title>
    <style>
      .order[data-user-info="john"] {
        color: green;
      }

      .order[data-user-info="abel"] {
        color: blue;
      }
    </style>
  </head>
  <body>
    <!-- 초록색적용 -->
    <div class="user1" data-user-info="john">john, 안녕</div>

     <!-- 파란색적용 -->
    <div class="user2" data-user-info="abel">abel, 안녕</div>
    <script>
      const divNode = document.querySelector(".user1");
      console.log(divNode.dataset.userInfo);     //john
    </script>
  </body>
</html>
```

## 
## 
## 
## 
## 
## 
