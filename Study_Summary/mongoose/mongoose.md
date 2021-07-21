# mongoose정리
(여기)[https://velog.io/@ckstn0777/Mongoose-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0] 참고    
(여기)[https://www.zerocho.com/category/MongoDB/post/5963b908cebb5e001834680e] 참고   

## 용어정리
1. 테이블 === 스키마    
2.    

## 추가로 공부할 키워드
1. query    
2. virtaul    
3. populate   
https://www.zerocho.com/category/MongoDB/post/59a66f8372262500184b5363

## 1. mongoDB연결 및 DB생성
```javascript
const mongoose = require("mongoose");

// "mongodb://도메인:포트/데이터베이스명"
// 데이터베이스를 만들어두지않아도 스키마 추가시 자동적으로 생성됨
mongoose.connect("mongodb://localhost:27017/test-database", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to test-database!");
  })
  .catch(error => {
    console.error("Connected error >> ", error);
  });
```

## 2. 스키마생성
```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    default: 23,
  },
  role: {
    type: String,
    required: true,     // 필수
    unique: true,       // 유일
    trim: true,         // 공백제거
    lowercase: true,    // uppercase: true
    max: 50,            // type: Number일경우 최대값 지정
  },
  likes: [String],      // 배열
  id: {
    type: mongoose.Schema.Types.ObjectId,
  }
});

const User = mongoose.model("User", UserSchema);  // 세번째 인수는 스키마명

module.exports = User;
```

## 3. 데이터넣기
`save()`사용시 자동적으로 스키마와 데이터베이스가 생성됨

```javascript
const User = require("./models/User");

const me = new User({
  name: "jhn",
  role: "Student",
});

me.save()
  .then(() => {
    console.log("저장성공 >> ", me);
  })
  .catch(error => {
    console.error("저장실패 >> ", error);
  });
```

## 4. methods / statics
+ `methods`에서 `this`는 찾은 객체  ( user )
+ `statics`에서 `this`는 스키마객체 ( User )

```javascript
// methods 선언
UserSchema.methods.comparePassword = function (password, cb) {
  if (this.password === password) {
    cb(null, true);
  } else {
    cb('password 불일치');  // cb는 밑에 사용에서 comparePassword의 두번째 인자
  }
};
// methods 사용
(async function () {
  const user = await User.findOne({ password: "1234" }).exec();

  user.comparePassword("1234", (error, result) => {
    if (error) {
      return console.log("패스워드 불일치 >> ", error);
    }
    console.log("패스워드 일치 >> ", result);
  })
})();

// statics 선언
UserSchema.statics.comparePassword = function (password) {
  return this.findOne({ password }).exec();
};
// statics 사용
(async function () {
  const user = await User.comparePassword("1234");
  console.log("user >> ", user);
})();
```

## 5. pre / post
+ `pre()`특정 동작을 하기 전에 실행   
+ `pre()`에서 `next()`호출시 다음 단계로 진입   

+ `post()`특정 동작을 하고 난 후 실행   
+ `post()`의 인수는 특정동작하고난 결과값   

```javascript
// save하기전 실행
UserSchema.pre("save", next => {
  console.log("save하기전 실행");

  next();
});

// save하고난 후 실행 인자는 save한 결과값 여기서는 user
UserSchema.post("save", result => {
  console.log("save하고나서 실행 >> ", result);
});
```

## 6. `find()`, `findOne()`, `findById()`
```javascript
// 만족하는 모든 유저 찾음 
(async function () {
  const user = await User.find({ age: 23 });
  console.log("user >> ", user);
})();

// 만족하는것중에 제일처음나온거 찾음
(async function () {
  const user = await User.findOne({ name: "john" })
  console.log("user >> ", user);
})();

// id를 기반으로 찾음
(async function () {
  const user = await User.findById("60f7f55cb9a20453d4c2a995")
  console.log("user >> ", user);
})();
```

## 7. `findOneAndRemove()`, `findOneAndUpdate()`, `findByIdAndRemove()`, `findByIdAndUpdate()`, 
```javascript
// 찾고 삭제
(async function () {
  const user = await User.findOneAndRemove({ age: 23 });
  console.log("user >> ", user);  // 삭제된 유저
})();

// 찾고 업데이트 ( 첫번째인자: 찾는것, 두번째 인자: 수정할것 )
(async function () {
  const user = await User.findOneAndUpdate(
    { age: 23 },
    { age: 33 }
    );
  console.log("user >> ", user);
})();

// 아이디를 기준으로 찾고 삭제
(async function () {
  const user = await User.findByIdAndRemove("60f7f63d6e0f533c900e3a2f");
  console.log("user >> ", user);
})();

// 아이디를 기준으로 찾고 업데이트 ( 첫번째인자: 아이디, 두번째 인자: 수정할것 )
(async function () {
  const user = await User.findByIdAndUpdate(
    "60f7f63d6e0f533c900e3a2f",
    { age: 123 }
  );
  console.log("user >> ", user);
})();
```

##

##