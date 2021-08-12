# 시작
`DOM을 깨우치다 - 코디 린들리`를 읽고 정리하는 글

# 1. DOM
`Document Object Model`으로 내가 이해한대로 해석해보자면    
`Document`즉 문서(html)를 `Object`(객체자료형)로 `Model`로 변환한 것이라고 생각함   
<br />
그러면 왜 문서를 객체로 변환하는 것일까를 생각해보면 기본적으로 우린 평소에 javascript를 사용할 때 `document.querySelector(".title")`같은 방식으로 javascript를 이용해서 문서(html)을 조작할 수 있음    
<br />
이것을 가능하게 해주는 것이 DOM이라고 이해했음    
html문서를 Object자료형으로 변환해서 javascript에 제공해준다면, javascript는 Object를 마음대로 변환해서 화면에 그려지는 html문서를 조작하는 것

+ html이 브라우저에서 해석될 때 브라우저가 Tree구조로 Node화해줌

## 1.1 Tree
문서를 객체로 변환할 때 태그내부의 태그등의 관계를 표현하기위해 `Node`를 `Tree`구조로 만듦

## 1.2 Node
문서를 객체로 변환할 때 막 변환시키는 것은 아니고 문서의 태그를 `Node`라는 형태로 바꿈
### 1.2.1 Node유형
Node유형은 각 노드를 구분하는 상수값을 가짐   
아래 예시가 전부가 아니고 자주 사용하는 것들만 추출했음
1. DOCUMENT_NODE **( 9 )**
    + window.document
2. ELEMENT_NODE **( 1 )**
    + 태그를 노드로 변환시킨것 ( `<div>`, `<span>` 등등 )
3. ATTRBUTE_NODE **( 2 )**
    + 속성값을 태그로 변환시킨것 ( `class="title"` )
4. TEXT_NODE **( 3 )**
    + html문서 내부의 텍스트 ( 줄바꿈, 공백포함 )
5. DOCUMENT_FRAGMENT_NODE **( 11 )**
    + 앤뭔지모르겠음
6. DOCUMENT_TYPE_NODE **( 10 )**
    + `<!DOCTYPE html>`
```html
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div>div태그</div>
        <script>
          console.log(Node.ELEMENT_NODE);   // 1
          console.log(document.querySelector("div").nodeType);   // 1  
        </script>
      </body>
    </html>
```

### 1.2.2 Node의 상속
기본적으로 모든 노드들은 Node를 상속받음    
+ 태그기준
  + Object < Node < Element < HTMLElement < HTML*Element
```html
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div>div태그</div>
        <script>
          let temp = document.querySelector("div");

          while(temp){
            console.log(temp.__proto__);
            temp = temp.__proto__;
          }
          /**
           * HTMLDivElement
           * HTMLElement
           * Element
           * Node
           * Object
           * /
        </script>
      </body>
    </html>
```

### 1.2.3 Node생성자의 속성과 메서드
#### 1.2.3.1 nodeType/nodeName
```html
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div>div태그</div>
        <script>
          console.log(document.querySelector("div").nodeType);   // 1
          console.log(document.querySelector("div").nodeName);   // DIV
        </script>
      </body>
    </html>
```

#### 1.2.3.2 nodeValue
text노드나 comment노드를 제외한 곳에서 사용시 거의 null이 나옴
```html
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div>div태그</div>
        <script>
          const $div = document.querySelector("div");
          console.log($div.nodeValue);              // null
          console.log($div.firstChild.nodeValue);   // "div태그"
          $div.firstChild.nodeValue = "div태그재정의";    // 요것도 가능
        </script>
      </body>
    </html>
```

#### 1.2.3.3 createElement(), createTextNode()
속성이나 주석 생성도 있는데 거의사용하지않거나 사용금지임
```html
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div>div태그</div>
        <script>
          const $div = document.querySelector("div");
          const $$div = document.createElement("div");          // ElementNode생성
          const $$textNode = document.createTextNode("안녕");   // TextNode생성

          $div.appendChild($$div);
        </script>
      </body>
    </html>
```

#### 1.2.3.4 innerHTML, outerHTML, textContent, innerText, outerText
```html
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div class="a">a</div>
        <div class="b">b</div>
        <div class="c">c</div>
        <div class="d">d</div>
        <div class="e">e</div>

        <script>
          const $a = document.querySelector(".a");
          const $b = document.querySelector(".b");
          const $c = document.querySelector(".c");
          const $d = document.querySelector(".d");
          const $e = document.querySelector(".e");

          // 1. innerText: 기존 태그내부 내용은 없애고 입력받은 텍스트로 ElementNode와 TextNode를 생성해서 넣음
          $a.innerHTML = "<span>a-1</span>";      // <div class="a"><span>a-1</span></div>

          // 2. outerHTML: 선택 태그자체를 ElementNode와 TextNode로 변환시킴
          $b.outerHTML = "<span>b-1</span>";      // <span>b-1</span>

          // 3. textContent: 기존 태그내부 내용을 없애고 입력받은 텍스트로 TextNode를 생성해서 넣음
          $c.textContent = "<span>c-1</span>";    // <div class="c"><span>c-1</span></div> ( <span>c-1</span>는 ElementNode가 아니라 TextNode임 )

          // 4. innerText: textContent와 같은것 같고, 비표준구문임
          $d.innerText = "<span>d-1</span>";      // <div class="c"><span>d-1</span></div>

          // 5. outerText: 선택 태그자체를 TextNode로 변환시킴, 비표준구문임
          $e.outerText = "<span>e-1</span>";      // <span>e-1</span> ( TextNode임 )

          // 출력결과
          // a-1
          // b-1
          // <span>c-1</span>
          // <span>d-1</span>
          // <span>e-1</span>

        </script>
      </body>
    </html>
```

### 1.2.4 HTMLElement생성자의 메서드
#### 1.2.4.1 insertAdjacentHTML()
태그에서 어느 위치에 값을 넣을지 상세하게 지정가능
```javascript
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div class="a">a</div>

        <script>
          const $a = document.querySelector(".a");
          const $$span1 = document.createElement("span");
          $$span1.textContent = "1";
          const $$span2 = document.createElement("span");
          $$span2.textContent = "2";
          const $$span3 = document.createElement("span");
          $$span3.textContent = "3";
          const $$span4 = document.createElement("span");
          $$span4.textContent = "4";

          $a.insertAdjacentElement("beforebegin", $$span1);   // 태그외부맨앞
          $a.insertAdjacentElement("afterbegin", $$span2);    // 태그내부맨앞
          $a.insertAdjacentElement("beforeend", $$span3);     // 태그내부맨뒤
          $a.insertAdjacentElement("afterend", $$span4);      // 태그외부맨뒤

          // 결과
          // 1
          // 2a3
          // 4

        </script>
      </body>
    </html>
```

### 1.2.5 Node생성자의 메서드
#### 1.2.5.1 appendChild(), insertBefore()
javascript노드개체를 DOM트리에 삽입함
1. `appendChild(appendElement)`: 선택한 노드의 마지막 자식노드뒤에 노드추가, 자식노드없을경우 추가한 노드를 첫번째 자식으로 인식함
2. `insertBefore(appendElement, targetElement)`: appendElement를 targetElement앞에 추가함

```javascript
<!DOCTYPE html>
  <html lang="ko">
    <head>
      <title>Document</title>
    </head>

    <body>
      <ul class="container">
        <li>2</li>
        <li>3</li>
      </ul>

      <script>
        const $container = document.querySelector(".container");
        const $$textNode = document.createTextNode("1");
        const $$li = document.createElement("li");
        $$li.appendChild($$textNode);                           // textNode를 li노드의 자식으로 추가 
        $container.insertBefore($$li, $container.firstChild);   // ul노드의 첫번째 자식앞에 li노드 추가

        // 결과
        // 1
        // 2
        // 3

      </script>
    </body>
  </html>
```

### 1.2.6

<hr />
<br />
<hr />

# 3장 Element노드
각 태그는 각각의 고유한 생성자를 가지며, 생성자를 이용해서 생성한 객체로 DOM트리 구성

## 알아둘것
1. `createElement`에 전달되는 값은 자동으로 소문자로 변환됨
2. `tagName`, `nodeName`이 반환하는 값은 대문자로 변환됨
3. `attributes`로 반환되는 것은 `NameNodeMap`이며, 이것은 라이브상태 즉, 내용물이 언제든 바뀔 수 있음
4. 속성의 값이 정의되어있는지 여부와 상관없이 존재만하면 `hasAttribute()`는 `true`를 반환함
5. `classList`는 수정불가능한 유사배열을 반환하며, `add()`, `remove()`, `contains()`, `toggle()`을 이용해서 변경할 수 있음
6. `data-*`는 자동으로 camelCase로 변환되며, delete를 이용해서 제거할 수 있음

<hr />
<br />
<hr />

# 4장 Element노드선택
각 태그는 각각의 고유한 생성자를 가지며, 생성자를 이용해서 생성한 객체로 DOM트리 구성

## 알아둘것

<hr />
<br />
<hr />


