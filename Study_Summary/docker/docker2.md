 # 인프런강의, 참고
1. [인프런강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci/dashboard)        
2. [전체적으로참고](https://docs.microsoft.com/ko-kr/visualstudio/docker/tutorials/docker-tutorial)      
3. [volume참고사이트](https://www.daleseo.com/docker-volumes-bind-mounts/)
4. [docker이미지생성후테스트](https://labs.play-with-docker.com/)

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

## 2. 명령어
### 2.1 컨테이너 생성
```
docker create 이미지명
```
[docker-hub](https://hub.docker.com/) 에서 자동으로 다운받아옴

### 2.2 컨테이너 실행
```
docker start -a 컨테이너 이름 or 아이디
```
1. -a : 컨테이너 실행후 화면에 출력되는것을 내 터미널창에 보여줌 ( attach를 의미 )

### 2.3 컨테이너 생성 및 실행 및 초기명령어 지정
```
docker run alpine ls
```
+ docker : docker client    
+ run : 컨테이너 생성 및 실행   
+ 이미지명 : 컨테이너를 위한 이미지   
+ ls : ls의 의미말고 현재 자리에 특정 명령어를 사용하면 기존에 이미지가 가지는 실행시 명령어를 무시하고 현재 위치에 적은 명령어를 실행함
+ `-p` : 포트맵핑 ( 내컴퓨터에서접근할포트:컨테이너에서열어줄포트 )
+ `-d` : 컨테이너 실행후 바로 밖으로 나옴 ( node실행시 대기하는데 `-d`넣어주면 바로나옴 )
+ `--name` : 생성할 컨테이너의 이름지정 ( 초기값은 랜덤문자열 )
+ `--rm` : 컨테이너 실행종료시 삭제

### 2.4 실행된 컨테이너 or 모든 컨테이너 보기
```
dokcer ps
dokcer ps -a
// "ps" => process status
// "-a" => all을 의미
```
1. CONTAINER ID : 컨테이너의 아이디
2. IMAGE : 컨테이너에 사용한 이미지명
2. COMMAND : 컨테이너 시작시 실행한 명령어
4. CREATED : 컨테이너 생성된 시간
5. STATUS : 컨테이너의 상태 ( up, exited, pause )
6. PORTS : 컨테이너가 개방한 포트와 호스트에 연결될 포트
7. NAMES : 컨테이너에 지정한 이름

### 2.5 컨테이너 중지
```
// 하던 작업을 마무리한후에 컨테이너 중지
docker stop 아이디 or 이름

// 즉시 컨테이너 중지
docker kill 아이디 or 이름
```

### 2.6 컨테이너 삭제
```
// 실행 종료된 특정 컨테이너 삭제
docker rm 아이디 or 이름

// 전체 컨테이너 삭제
dokcer rm `docker ps -a -q`
```
단, 컨테이너가 중지되어있어야 삭제할 수 있음    

### 2.7 이미지 삭제
```
docker rmi 이미지이름
```
단, 이미 사용하는 컨테이너가 존재하면 이미지를 제거할 수 없음   

### 2.8 사용하지않는 이미지 컨테이너 모두 삭제
```
docker system prune
```
단, 실행중인 컨테이너와 이미지는 삭제하지않음   

### 2.9 실행중인 컨테이너에 명령어 전달
```
docker exec -it {아이디 or 이름} 명령어
// sh, bash, zsh, power shell 등등으로 터미널에 접근가능
```
+ `-i` : interacive
+ `-t` : terminal
+ `-it` : `-i`와 `-t`를 합쳐서 적은것으로 실행중인 컨테이너 내부의 터미널에 접속하는 것

## 3. image생성
### 3.1 베이스이미지
이미지에서는 여러가지의 레이어가 포함되는데 그중에 가장 베이스가 되는 레이어    

### 3.2 이미지 생성과정
1. 베이스이미지를 이용해서 임시컨테이너를 생성함    
2. 임시컨테이너에 `Dockerflie`에서 설정한 종속성설치 및 명령어입력함    
3. 생성한 임시컨테이너를 이용해서 이미지를 생성함   
4. 임시컨테이너 삭제함    

### 3.3 나만의 이미지생성
`Dockerfile`라는 파일이 존재하는 디렉토리를 가리키면됨
`docker build -t 도커아이디/저장소이름:버전 ./`
`docker build -t ghksaud55/testpj:latest ./`
+ `-t`: 생성될 이미지의 이름지정 ( 관습적으로 `아이디/저장소이름:버전` 형태로 작성함 )

```python
# 파일명: Dockerfile

# 베이스 이미지 ( 기반이 되는 이미지 레이어 )
# FROM 이미지이름:태그 ( 태그 생략시 최신버전 사용 )
# FROM baseImage
FROM node:10

# 컨테이너에서 파일저장경로
WORKDIR /user/src/app

# 종속성만 미리 복사
COPY package*.json ./

# 추가적으로 필요한 파일 다운
# RUN command
RUN npm install

# 이외에 모든 파일 복사
COPY ./ ./

# 컨테이너 시작시 실행할 명령어
# CMD [ "executable" ]
CMD [ "node", "app" ]
```
1. `FROM`: 기본 바탕이 되는 이미지레이어 설정
2. `RUN`: 도커이미지가 생성되기전에 수행할 쉘명령어
3. `CMD`: 컨테이너가 실행되었을 때 실행할 파일 or 쉘명령어
4. `COPY`: 생성할 이미지에 넣을 파일들 지정
5. `WORKDIR`: 컨테이너에서 파일을 저장할 경로 지정

## 4. Volume
파일들을 컨테이너로 복사하지않고 참조하도록 설정하는것   
docker는 기본적으로 컨테이너를 삭제하면 데이터가 삭제되고, 또는 여러 컨테이너간에 데이터를 공유해서 사용하고 싶을때 적용하면됨    
Volume을 사용하는 방식은 두가지가 있음 ( 알고보니 Volume이 두가지방식은 아님 )

### 4.1 Volume방식
실행하는 컴퓨터의 특정 공간에 공유할 폴더를 생성하는 방식임   
#### 4.1.1 Volume생성
`docker volume create <volume-name>`
#### 4.1.2 Volume조회
`docker volume ls`
#### 4.1.3 특정 Volume상세조회
`docker volume inspect <volume-name>`
+ `Mountpoint`에 적힌 경로가 현재 volume값이 저장된 경로가 적혀있음 ( ubuntu 20.04 기준으로 숨김파일이라 직접쳐야들어가짐 )    
#### 4.1.4 Volume사용
+ `docker run --name my-node -d -p 8080:8080 -v <volume-name>:<container-route> node:10`    
+ `docker run --name my-node -d -p 8080:8080 -v my-volume:/app/src node:10`   
위 처럼 사용하면 my-volume이라는 폴더에 존재하는 파일들이 컨테이너의 `/app/src`에 공유됨    
컨테이너를 몇개를 사용하든 동일한 파일이 공유되며 하나가 수정되면 전체가 바뀜   
#### 4.1.5 `Dockerfile`과 `volume`사용시 주의
`Dockerfile`과 `volume`을 같이 사용할 경우 조심해야할게 `Dockerfile`로 복사한 파일이 존재하는 폴더에다가 `volume`을 지정해버리면
기존값들이 사라지고 volume의 값만 남게됨    
#### 4.1.6 Volume제거
+ 특정삭제: `docker volume rm <volume-name>`    
+ 전체삭제: `docker volume prune`   

### 4.2 bind-mount방식
특정 volume을 생성하지않고 호스트의 특정 경로의 폴더를 공유하는것   
#### 4.2.1 사용
+ `docker run --name my-node -d -p 8080:8080 -v <host-route>:<container-route> node:10`    
+ `docker run --name my-node -d -p 8080:8080 -v $(pwd):/app/src node:10`   
ubuntu 20.04 terminal 기준 현재경로는 `$(pwd)`    
window 10 cmd 기준 현재경로는 `%cd%`    

```
docker run -d -p 7777:8080 --name my-node -v /user/src/app/node_modules -v %cd%:/user/src/app ghksaud55/node
```

## 5. pull image
[docker-hub](https://hub.docker.com/) 에 이미지 올리는법        
1. `docker login -u <user-name>`
2. `docker tag <tag-name> <user-name>/<image-name>`
3. `docker push <username>/<image-name>`

## xxx. 각종 컨테이너 사용법
### xxx.1 mysql설치
```
docker run --name my-mysql -d -e MYSQL_ROOT_PASSWORD="초기비밀번호" -p 3306:3306 mysql
docker exec -it my-mysql bash
```

### xx.2 mongodb설치
```
docker run --name my-mongodb -d -p 27017:27017 mongo
docker exec -it my-mongodb bash
```

### xxx.3 redis설치
```
docker run --name my-redis -d -p 6379:6379 redis
```