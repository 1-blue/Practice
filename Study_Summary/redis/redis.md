## 참고사이트
[여기](https://www.zerocho.com/category/NodeJS/post/5a3238b714c5f9001b16c430)

## Redis사용이유
... 잘모르겠음 일단 사용방법만 작성하는걸로

## 설치
docker를 이용한 설치    
```
docker run --rm -d --name my-redis -p 6379:6379 redis
```

## 실행
```
docker start my-redis

// 쉘안에서 레디스로 접속
docker exec -it my-redis bash
redis-cli
```

## 명령어
사용할 때 마다 추가할 예정

### 0. 
```
// 삭제
del "key_name"

// 모든키 찾기
keys *
```

### 1. get/set
단순 key-value저장
```
// set
set "key" "value"
set name john

// get
get "key"
get name
```

### 2. hash
객체형식으로 저장
```
// set이 key-value쌍이 안맞으면 오류
// set
hmset "key" "name" "value" "name" "value" ...
hmset person name john age 23

// get
hgetall "key"
hgetall person
```

### 3. list
배열형식으로 저장
```
// set
rpush "key" "value" "value" ...
rpush color green pink
lpush color red blue

// get
lrange "key" "start" "end"
lrange color 0 -1 // red blue green pink
```

## nodejs와 연동
### 1. 일반사용
```javascript
const redis = require("redis");
const client = redis.createClient("redis://localhost:6379");
// "redis://localhost:6379"안적어줘도 자동적으로 연결됨
// 이유는 아직 모르겠음

// string방식 ( key-value )
client.set("name", "1-blue");
client.get("name", (error, result) => {
  console.log(result);  // 1-blue
});

// hash방식 ( object )
client.hmset("person", {
  name: "john",
  age: 23
});
client.hgetall("person", (error, result) => {
  console.log(result); // { name: "john", age: 23 }
});

// list
// rpush, lpush존재
client.rpush("color", "red", "blue", "green");
// 0: 시작, -1: 끝
client.lrange("color", 0, -1, (error, result) => {
  console.log(result);
});

// set ( 중복없는배열 )
client.sadd("card", "BC", "KB", "NH", "NH");
client.smembers("card", (err, result) => {
  console.log(result); // [ "BC", "KB", "NH" ]
});
```

### `express-session`에서 store로 사용    
```javascript
const express = require("express");
const expressSession = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

const client = redis.createClient();
const redisStore = connectRedis(expressSession);

const app = express();

const sessionOption = {
  secret: "nodejs",
  resave: false,
  saveUninitialized: true,
  store: new redisStore({
    client,
  }),
};

// 사용이유 req.session에서 사용하던 데이터가 서버종료후에도 redis에 유지되고
// 다시시작할경우 자동적으로 redis에서 데이터를 받아와서 사용함
```