https://www.w3schools.com/css/default.asp

## 1. css구문
`Selector { Declaration; }`으로 구성됨    
```css
h1 { color: red }
```

<br />
<hr />
<br />

## 2. 색상 투명도 적용
`rgba(255, 99, 71, 0.5)`  // 50%투명도 적용

<br />
<hr />
<br />

## 3. background
### 3.1 background-color
`background-color: lightblue;`

### 3.2 background-image
`background-image: url("./images/a.png");`

### 3.3 background-repeat
1. `no-repeat`: 반복없음
2. `repeat-x`: 가로만 반복
3. `repeat-y`: 세로만 반복

### 3.4 background-position
`background-position: top right;`   
이미지 시작 위치를 지정

### 3.5 background-attachment
1. `fixed` : 이미지가 고정되어 스크롤바를 내려도 고정된 위치에 존재
2. `scroll` : 스크롤바 내리면 이미지 그대로 사라짐

### 3.6 background-clip
1. `border-box`: border까지 포함해서 background적용
2. `padding-box`: padding포함해서 background적용
3. `content-box`: content만 backgorund적용    
`initial`과 `inherit`도 존재함

### 3.7 background-origin
`background-clip`와 거의 비슷하고 적용될 시작 위치를 좌측상단을 기준으로 지정하고 하단이나 우측은 적용안됨

### 3.8 background-size
1. `auto` : 자동
2. `length` : px같은 단위로 지정
3. `percentage` : 100% 처럼 퍼센트로 지정
4. `cover` : 가로나 세로중 더 짧은 곳이 백그라운드에 가득차게 설정
5. `contain` : 이미지의 기존 비율을 유지하고 가장 크게
`initial`과 `inherit`도 존재함

### 3.9 background 축약문법
`background`로 단축해서 적을 수 있으며, color -> image -> repeat -> attachment -> position순으로 적으면 됨

<br />
<hr />
<br />

## 4. border
### 4.1 border-style
|속성명|내용|
|---|---|
|dotted|점선|
|dashed|파선|
|solid|굵은선|
|double|이중|
|groove|3D그루브|
|ridge|3D능선|
|inset|top, left|
|outset|right, bottom|
|none|없음|
|hidden|숨김|

기본 형태 `border-style: dotted dashed solid double;`   
`border-top-style: solid;`처럼도 가능

### 4.2 border-width
기본 형태 `border-width: 1px 1px 1px 1xp;`      
키워드값 `thin`, `medium`, `thick`이 있음 

### 4.3 border-color
기본 형태 `border-color: red blue green yellow;`      
`RGB`, `HEX`, `HSL` 값 등등 사용 가능

### 4.4 border 축약문법
기본 형태 `border: width style color` ( style만 필수 )    
`border-left: width style color`가능

### 4.5 border-radius
기본 형태 `border-radius: 5px;`

<br />
<hr />
<br />

## 5. margin
### 5.1 margin축약문법
기본 형태 `margin: 1px 1px 1px 1px;`    
+ auto - 부모 요소 크기를 기준으로 좌, 우 여백을 동일하게 마진으로 할당받음
+ 길이 (px, pt, cm, em emdemd )
+ %
+ `inherit` - 부모 요소 값을 할당받음

### 5.2 margin 상쇄
margin끼리 붙게 되면 겹침   
따라서 더 큰쪽의 마진크기만큼만 영역을 차지하게 됨

<br />
<hr />
<br />

## 6. padding
### padding축약문법
기본 형태 `padding: 1px 1px 1px 1px;`     
+ 길이
+ %
+ `inherit`

<br />
<hr />
<br />

## 7. 높이와 너비
### 7.1 width와 height
기본 형태 `width: 1px;`   
기본 형태 `height: 1px;`   
+ auto - 기본값 ( 브라우저 )
+ 길이
+ %
+ initial - 기본값
+ inherit - 부모의 값   
참고로 `width`와 `height`는 padding, border, 여백을 포함하지 않고 순수 컨텐츠 사이즈를 의미함   

### 7.2 max-width와 max-height
기본 형태 `max-width: 500px;`   
기본 형태 `max-height: 500px;`    
최대 길이가 500px로 고정되며 브라우저 크기에 따라 `width`가 가변적으로 변함   
즉, `width: 500px;`을 했을 경우 크기 500px이 고정이지만   
`max-width: 500px;`인경우 브라우저 width가 500px이하라면 그에 맞게 width값이 가변적으로 변함    

<br />
<hr />
<br />

## 8. CSS상자모델
1. `box-sizing: border-box;` : padding, border, content합쳐서 width크기
2. `box-sizing: content-box;` : content만 width크기이고 개별적인 padding과 border를 가짐 
추가로 margin은 content에 포함되지 않는 독립적인 영역임 ( 아마도 이런 이유때문에 마진상쇄가 존재한다고 생각함 )

<br />
<hr />
<br />

## 9. outline
border바깥에 붙어 있는 영역이며, margin처럼 겹칠 수 있으며, 컨텐츠의 영역이 아님    
### 9.1 outline-style
`dotted`, `dashed`, `solid`, `double`, `groove`, `ridge`, `inset`, `outset`, `none`, `hidden`이 가능

### 9.2 outline-width
`thin`(1px), `medium`(3px), `thick`(5px), `길이`, `%` 가능

### 9.3 outline-color
`name`, `HEX`, `RGB`, `HSL`, `invert` 가능

### 9.4 outline단축속성
`width`, `style`, `color` 순서 ( style필수 )

### 9.5 outline-offset
기본 형태 `outline-offset: 1px;`    
`border`와 `outline`사이에 간격을 지정함

<br />
<hr />
<br />

## 10. text
### 10.1 color
`name`, `HEX`, `RGB` 등이 가능

### 10.2 text-align
기본 형태 `text-align: center;`   
요소내 텍스트를 수평방향에서 정렬기준을 정할 수 있음
+ `left`
+ `center`
+ `right`
+ `justify` : 각 줄마다 여백이 늘어나면서 같은 width를 가지게 됨

### 10.2 텍스트 방향
기본 형태 `direction: rtl;`     
기본 형태 `unicode-bidi: bidi-override;`    
rtl하면 글자가 우측에 붙고 bidi-override하면 글자가 반전되는데 일단 뭔지 정확히는 모르겠음

### 10.3 vertical-align
기본 형태 `vertical-align: center;`     
텍스트에서 요소의 수직위치를 지정함     
```html
<p>test<span>text</span>test</p>
```
정확한지는 모르겠으나 이런 이야기인것같음     
위 태그처럼 텍스트 내부에 `<span>`의 텍스트가 존재할 때 `<span>`에 `vertical-align`속성을 주입하면    
`<span>`의 수직방향 위치가 지정되는 것이라고 생각함

### 10.4 text-decoration
기본 형태 `text-decortion: overline;`     
+ overline
+ line-through
+ underline
+ none

### 10.5 text-trnsform
기본 형태 `text-transform: uppercase;`    
+ uppercase : 모두 대문자
+ lowercase : 모두 소문자
+ capitalize : 단어의 첫글자만 대문자

### 10.6 텍스트 간격
1. `text-indent: 50px;` : 첫 줄의 들여쓰기
2. `letter-spacing: 3px` : 문자사이의 간격 ( 음수값 가능 )
3. `word-spacing: 10px;` : 단어와 단어사이의 간격 ( 음수값 가능 )
4. `line-height: 1px` : 줄과 줄사이의 간격을 지정 
5. `white-space: nowrap;` : 화이트스페이스 처리방법을 지정하는 것 ( `nowrap`외에도 많고 `nowrap`은 무시하라는 뜻인것 같음 )

`line-height`는 텍스트 세로 정렬할 때 가끔 쓰이는데 좋지 않은 방법이지 않나 생각함...   
왜냐하면 직접적으로 수치를 줘야하는 것 같고, 1줄이상인 경우 이상한 스타일이 되기 때문   
따라서 `absolute + translate(-50%, -50%)`사용하자

### 10.7 text-shadow
기본 형태 `text-shadow: 2px 2px 5px red;`   
순서대로 수평방향, 수직방향, 번짐정도, 색깔임 ( 번짐정도와 색깔은 생략가능 )

<br />
<hr />
<br />

## 11. font
### 11.1 font-family
기본 형태 `font-family: Arial, Verdana, Helvetica;`   
여러개 나열한 것은 처음부터 시도하고 폰트없으면 대체하는 것임
+ `Arial`
+ `Verdana`
+ `Helvetica`
+ `Tahoma`
+ `Trebuchet MS`
+ `Times New Roman`
+ `Georgia`
+ `Garamond`
+ `Courier New`
+ `Brush Script MT`

### 11.2 font-style
기본 형태 `font-style: nomal;`    
+ `nomal` : 기본 형태
+ `italic` : 기울어짐
+ `oblique` : 조금더 기울어짐

### 11.3 font-weight
기본 형태 `font-weight: nomal;`    
+ `nomal` : 기본 형태
+ `bold` : 굵음
+ `number`

### 11.4 font-variant
기본 형태 `font-variant: nomal;` 
+ `nomal` : 기본 형태
+ `small-caps` : 대문자로 소문자크기로


### 11.5 font-size
기본 형태 `font-size: 1em;`    
기본적으로 `px`값 같은 고정된 단위로 사용하는 것은 좋지않음    
사용자가 폰트크기를 변화시킬수 없게됨   
따라서 `em`, `%`같은 상대적인 값을 사용하는 것이 좋음    
+ `1em` : 브라우저의 기본 텍스트 크기 ( `16px` )
+ `1vw` : 뷰포트 즉 브라우저의 가로길이중 1% ( `vh`는 반대 )

### 11.6 google폰트, 글꼴
```javascript
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide|Sofia|Trirong">
</head>
```
[여기](https://www.w3schools.com/css/css_font_google.asp)참고

### 11.7 font축약문법
`style`, `variant`, `weight`, `size`/`line-height`, `family` 순으로 적음   
기본 형태 `font: italic small-caps bold 12px/30px Georgia, serif`   
font-size와 font-family는 필수 값

<br />
<hr />
<br />

## 12. icon
### 12.1 awesomeicon
[awesome-icon](https://fontawesome.com/)    
`<script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>`   

### 12.2 bootstrap
[bootstrap-icon](https://fontawesome.com/)    
`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">`

### 12.3 google아이콘
[google-icon](https://fontawesome.com/)    
`<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`    

<br />
<hr />
<br />

## 13. link
+ `a:link` : 방문하지 않은 링크
+ `a:visited` : 방문한 링크
+ `a:hover` : 마우스올릴 때
+ `a:active` : 클릭하는 순간    
특정 조건 hover은 link랑 visited뒤에 와야하고, active는 hover뒤에 와야함

<br />
<hr />
<br />

## 14. list
### 14.1 list-style-type
기본 형태 `list-style-type: circle;` ( `<ul>`일 때 디폴트값은 빈동그라미 )
`circle`, `square`, `upper-roman`, `lower-alpha`, `nones`

### 14.2 list-style-image
이미지 넣기도 가능 => `list-style-image: url('sqpurple.gif');`

### 14.3 list-style-position
기본 형태 `list-style-position: outside;`     
`outset`, `inset`존재 ( 글머리가 안쪽/바깥쪽 )

### 14.4 list-style축약형태
`list-style: square inside url("sqpurple.gif");` ( 적을것만 적으면 됨 )
type, position, image 순서

<br />
<hr />
<br />

## 15. table
패스

<br />
<hr />
<br />

## 16. display

### 16.1 block 수준 요소
기본적으로 블럭수준의 요소는 한 라인을 모두 차지함 ( width만 확장됨, height는 확장 안됨 )
+ `<div>`
+ `<h*>`
+ `<p>`
+ `<form>`
+ `<header>`
+ `<footer>`
+ `<section>`

### 16.2 inline 수준 요소
기본적으로 인라인수준의 요소는 자신의 크기만큼만 차지함   
+ `<span>`
+ `<a>`
+ `<img>`

### 16.3 display: none, visibility: hidden
`display: none;`과 `visibility:hidden`는 둘다 요소를 숨기지만   
`display: none`은 요소가 애초에 없는 것처럼 공간조차 차지하지않도록 숨기고    
`visibility:hidden`는 보이지 않는 것일 뿐 공간을 차지함   

<br />
<hr />
<br />

## 17. position
### 17.1 static
기본값이고, top, right등의 위치값에 영향을 받지 않음    
위에서 아래, 왼쪽에서 오른쪽으로 배치되고 자식요소일 땐 부모요소를 기준으로 배치됨

### 17.2 relative
원래 놓여야할 위치를 기준으로 위치값에 의해 배치됨    
배치기준은 static과 일치함 ( 위치값에 의해 이동되는 것 외엔 같음 )

### 17.3 fixed
뷰포트를 기준으로 배치되며 스크롤되더라도 변하지 않음

### 17.4 absolute
자신의 조상중 포지션이 relative, fixed, absolute, sticky인 놈을 기준으로 배치됨   
단, 조상중에 위 포지션이 없는경우 fixed와 같은 동작을 함

### 17.5 sticky
뷰포트를 만나면 지정한 사이즈에 달라붙음    
```css
p{
  position: sticky;
  top: 0px;
  bottom: 100px;
}
```
top에서 0px아래에, bottom에서 100px위에 달라붙음    
즉, top에 바로달라붙고, bottom에 100px떨어져서 달라붙음   
단 주의사항이 sticky는 선언된 부모내부에서만 동작함

### 17.6 z-index
요소가 겹칠경우 출력된 순서를 지정함    
기본값은 0이고 음수값도 가능하며, 큰 수 일수록 위쪽에 출력됨

<br />
<hr />
<br />

## 18. overflow
+ visible : 초과되는 것도 보임
+ hidden : 초과되는 것은 잘리고 숨겨짐
+ scroll : 그냥 무조건 스크롤바 생김
+ auto : 초과되면 스크롤바가 생김   
`over-flow-x`, `over-flow-y` 같은 형식으로도 사용 가능

<br />
<hr />
<br />

# Tip
1. 브라우저창보다 width가 클경우 가로스크롤이 생긴다. 이것을 방지하려면 max-width로 값을 설정하자

# 참고사이트
1. [w3school](https://www.w3schools.com/css/)
2. [awesome-font](https://fontawesome.com/)


https://www.w3schools.com/css/css_float.asp