# swagger
API를 쉽게 알아보기위함(?)    
API를 서버에서 바로 실행할 수 있도록 만들고 테스트도 가능

## nodejs에서 swagger사용
[여기](https://github.com/swagger-api/swagger-ui)에서 다운받아서 `/dist`에 있는 애들만 `/public`에 옮겨서 사용   
`/dist`의 `index.js`의 url만 `.yaml`파일이 존재하는 url로 바꿔주면됨
```yaml
// .yaml파일

openapi: 3.0.0
info:
  version: "1.0.0"
  title: "Test API"
  description: "테스트용 swagger, query로 name, one, two를 보내서 json으로 전송받음"
servers:
  - description: TestSwagger
    url: http://localhost:3000/
paths:
  /adder/{name}:
    get:
      summary: Adder API
      parameters:
        - name: name
          in: path
          description: 이름입력
          require: true
          schema:
            type: string
        - name: one
          in: query
          description: 첫번째 숫자 입력
          require: true
          schema:
            type: integer
        - name: two
          in: query
          description: 두번째 숫자 입력
          require: true
          schema:
            type: integer      
      responses:
        "200":
          description: 정상
          content: 
            application/json:
              schema:
                type: object
                properties:
                  name:
                    type: string
                  value:
                    type: integer

```