# HOC (High-Order-Component)
컴포넌트의 속성들이 중복해서 사용할 때 공통 컴포넌트를 이용해서 중복을 방지하는 것 ( 컴포넌트간 속성코드 공유 )   
`HOF`(High-Order-Function)에서 유래된 것 ( HOF: 고차함수, 함수를 받아서 함수를 리턴하는 함수 )    
즉, 컴포넌트를 인수로 받아서 컴포넌트를 리턴하는 것이 `HOC`임   

## 예시
hoc적용 안된 파일   
UsersView와 PostsView가 중복되는 부분들이 있음
```javascript
// UsersView.vue
<template>
  <h1>{{ data.data.name }}</h1>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      data: {}
    }
  },
  async created(){
    this.data = await axios.get('https://jsonplaceholder.typicode.com/users/1')
  }
}
</script>

// PostsView.vue
<template>
  <h1>{{ data.data.title }}</h1>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      data: {}
    }
  },
  async created(){
    this.data = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
  }
}
</script>
```

HOC적용   
중복되는 부분들을 hoc로 처리함
```javascript
// hoc.js
import Vue from 'vue';
import axios from 'axios';

export const hoc = (name) => (component) => {
  return Vue.component("HOC", {
    render(createElement) {
      return createElement(component, {
        props: {
          data: this.data.data,
        }
      })
    },
    data(){
      return{
        data: {}
      }
    },
    async created(){
      this.data = await axios.get(`https://jsonplaceholder.typicode.com/${name}/1`)
    }
  })
}

// UsersView.vue
<template>
  <h1>{{ data.name }}</h1>
</template>

<script>
export default {
  props: ['data']
}
</script>

// PostsView.vue
<template>
  <h1>{{ data.title }}</h1>
</template>

<script>
export default {
  props: ['data']
}
</script>
```

아직 정확하게 이해가 안가서 추후에 다시 정리할 예정