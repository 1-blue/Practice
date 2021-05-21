# 1. Reactivity
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
<br />
<br />

# 2. $
1. `$liseners`에는 부모에서 전송한 이벤트가 들어가 있음
사용하려면 원하는 이벤트 꺼내서 v-on으로 사용하면 된다.   

2. `$attrs`에는 부모에서 전송한 props가 아닌 속성값이 들어가 있음
사용하려면 원하는 속성만 꺼내서 혹은 전체에 v-bind로 사용하면 된다.
단, 자식의 루트엘리먼트에 속성값적용을 안하려면 `inheritAttrs: false`를 적용하면 된다.    
