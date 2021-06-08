# axios
node.js 기반의 Promise용 HTTP클라이언트

## 설치
`npm install axios`

## 개발용 CDN
`<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`

## 2.1 axios.get()
### 2.1.1 QueryString보내기
```javascript
// then내부와 catch는 생략
// 1
axios.get("/user?id=test")
  .then(response => {
    // ...
  });

// 2
axios.get("/user", {
  params: {
    id: "test"
  }
})
  .then(response => {
    // ...
  });

// 3
(async function() {
  await axios.get("/user?id=test");
  await axios.get("/user", { params: { id: "test" } });    // 요것도 가능
})();
```

## 2.2 axios.post()
```javascript
// 1
axios.post("/user", {
  firstName: "Fred",
  lastName: "Flint",
})
  .then(response => {
    // ...
  });
```

## 2.3 axios()
```javascript
axios({
  method: "post",
  url: "/user"
  data: {
    firstName: "Fred",
    lastName: "Flint",
  }
});
```

## 2.4 axios.create()
```javascript
const instance = axios.create({
  url: "/users",     // 상대주소 or 절대주소

  method: "get",    // get이 default값

  baseURL: "https://jsonplaceholder.typicode.com",   // url이 상대주소면 baseURL이 앞에 붙음

  transformRequest: [function(data, headers){
    return JSON.stringify(data);    // 아니 근데 이거 전송이 이상하게됨
    /**
     * 서버측에서 req.body출력해보면
     * '{"firstName":"Fred","lastName":"Flint"}': '' 이런식으로 출력되는데... 키값에다가 문자열화한 데이터가 들어가 있음
     * JSON.parse(Object.keys(req.body)) 이런짓을 하면 되긴하는데 애초에 전달될 때 뭐가문제인지를 모르겠음
     * data를 전송하면 전달자체가 안되고
     * JSON.stringify(data)를 하면 이상하게 전달됨
     */
  }],

  transformRequest: [function(data, headers){   
    const tempData = JSON.parse(data);        // data가 stringify되어 있어서 파싱해줘서 사용해야함
    tempData.fruit = "apple";
    return tempData;
  }],

  headers: { 'X-Requested-With': 'XMLHttpRequest' },    // X-Requested-With아닐 땐 cors오류남... 이유는 모르겠음

  // 이후에 추가하는것도 CORS 에러나서 이유찾고 테스트해보고 추가할생각

});

1. `baseUrl`: `axios.create()`요청시에 baseUrl지정하는데 사용
```

## 2.5 axios응답데이터
```javascript
axios.get("https://jsonplaceholder.typicode.com/users/1")
  .then(response => {
    console.log(response);
  })

// response에 들어 있는 데이터들
{
  data: {},           // 서버측에서 응답한 데이터
  status: 200,        // 서버측에서 응답한 HTTP상태코드
  statusText: "KO",   // 서버측에서 응답한 HTTP상태메시지
  headers: {},        // 서버측에서 응답한 헤더정보
  config: {},         // axios에서 설정된 config구성
}
```

## 2.6 axios 기본값 설정예시
```javascript
// 1. 기본 URL지정방법
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// 2. 기본 토큰 지정 방법
// request-header의 authorization으로 이게 넘어감
axios.defaults.headers.common['Authorization'] = "122asdjiqwas23_token";
// 지금 적은 값은 그냥 임의의 값이고 실제 사용시
// 로그인시 받은 토큰값을 로그인 후 요청할 때 심어서 보내면 됨
// 백엔드쪽 req.headers.authorization으로 받으면 됨

// 3. 기본 전송방법 지정
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 4. 기본 타임아웃 지정
axios.defaults.timeout = 2500;
```

## 2.7 axios인스턴스생성 및 사용 예시
```javascript
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

instance.headers.common['Authorization'] = "122asdjiqwas23_token";

instance.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.timeout = 2500;

// 사용
instance.get("/users/1")    // baseURL에 인수 추가된형태로 넘어감
  .then(console.log);       // 즉, https://jsonplaceholder.typicode.com/users/1 에다가 전송
                            // 네트워크패널보면 Authorization에 122asdjiqwas23_token도 전송됨
```

## 2.8 인터셉터
axios를 이용해 요청을 보내기전, 그리고 응답이 오자마다 데이터를 컨트롤 할 수 있음
```javascript
// 요청 인터셉터
const myRequestInterceptor = axios.interceptors.request.use(config => {
    console.log("요청보내기전 호출됨");
    config.headers.Authorization = "adasd1234sd356zdgs";
    return config;
  }, error => {
    console.log("오류 요청을 보내기전 호출됨");
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
const myResponseInterceptor = axios.interceptors.response.use(
  function (response) {
    console.log("응답 오자마자 실행");
    // 데이터 가공
    return response;
  },
  function (error) {
    console.log("오류 응답시 실행")
    return Promise.reject(error);
  });

// 인터셉터 제거
axios.interceptors.request.eject(myRequestInterceptor);
axios.interceptors.request.eject(myResponseInterceptor);
```
만약 인스턴스에 사용하고 싶다면 axios대신 인스턴스를 넣고 사용하면 됨   

## 2.9 에러처리
```javascript
// http://localhost:3000 으로 호출했을 때
axios.defaults.baseURL = 'http://localhost:3000';
axios.get("/test", { validateStatus: status => status < 500 })  // status코드가 500이상일 때 만 에러발생
  .then(res => {
    console.log("성공요");
    console.log(res);
  })
  .catch(error => {
    console.log("에러요");
    if(error.response) {
      console.log("status코드가 200범위가 아님");                 // 기본적으로 200대가 아니면 에러발생임
      console.log(error.response);
    } else if(error.request) {
      console.log("요청은 갔으나 응답이 없음");                   // 요거 응답안해도 호출이 안되는데...?
      console.log(error.request);
    } else {
      console.log("여긴 몰라요 무슨 에러인지");
      console.log(error.message);
    }
  });
```
위 예시는 then() ~ catch()이지만 async await으로 처리하고 try ~ catch문으로 처리해도 됨

# 참고사이트
[axios](https://xn--xy1bk56a.run/axios/guide/)