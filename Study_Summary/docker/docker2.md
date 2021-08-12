# 인프런강의
[여기](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci/dashboard)

## 공부할 키워드
1. 하이퍼바이저
2. 네임스페이스
3. 

## 1. docker
### 1.1 docker사용이유
프로그램들을 설치하기위해선 installer가 필요하면 그 installer는 해당 **컴퓨터의 환경**에 따라서 오류가 발생할 수 있음    
하지만 docker를 사용하면 컴퓨터의 환경에 상관없이 설치할 수 있으며, 더 간단하게 설치가능하고, 원하는 설정에 맞춰서 설치가능

### 1.2 docker란
**container**를 사용하여 응용프로그램을 더 쉽게 만들고 배포할 수 있도록 설계된 도구   

### 1.3 image
프로그램을 실행하는데 필요한 모든 설정이나 종속성을 가짐    
이미지에는 **시작시 실행할 명령어**와 **파일 스냅샷**이 들어있음    
예를들면 `npm install`과 `package.json`, `app.js`가 이미지안에 들어있고 이미지 설치시 자동으로 `npm install`이 입력됨   

### 1.4 container란
이미지의 인스턴스라고 생각하면됨 ( 이미지를 이용해서 컨테이너를 찍어낼수있음 )    
프로그램과 실행환경을 가지고, 컨테이너로 프로그램을 실행함    

### 1.5 docker실행흐름
+ `docker-client`: CLI   
+ `docker-server`: Daemon    
1. `docker-client`에 명령어 입력
2. `docker-server`에 명령어 전달
3. `image-cache`에 이미지 존재여부 확인
4. 없으면 `docker-hub`에서 이미지 다운
5. `image`를 이용해서 `container`생성 및 실행