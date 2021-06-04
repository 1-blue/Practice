# 1. 기본개념
## 1.1 docker
컨터이너 기반의 오픈소스 가상화 플랫폼
하나의 프로세스를 OS로 만드는 것

## 1.2 container
os에서 논리적으로 나눠진 구역 (하나의 프로세스)

## 1.3 image
컨테이너 실행에 필요한 파일과 설정값들을 포함하고 있는 것
```
┌━━━━━━━━━━━━━━━━━━━━━━┐
┃      Container       ┃
┃  c1     c2     c3    ┃
┃  DB   server ubuntu  ┃
┃    -------------     ┃
┃        Docker        ┃
┃    -------------     ┃
┃         OS           ┃
└━━━━━━━━━━━━━━━━━━━━━━┘
```

<br />
<hr />
<br />

# 2. docker명령어
## 2.1 이미지 찾기
`docker search {이미지명}`

## 2.2 파일공유
`docker run -v {localpath}:{container-path}` (-v옵션을 줘야함)

## 2.3 docker container 명령
### 2.3.1 현재 실행중인 컨테이너 보기
`docker [container] ps [-a]`    
+ `-a` : 실행중, 실행했던 컨테이너 보기

### 2.3.2 이미지 설치하기
`docker [container] pull {이미지명}`

### 2.3.3 server컨테이너 생성
`docker [container] run [--name] [지정할이름] [-d] [-p] [내포트:상대포트] {이미지명} {명령어}`    
ex) docker run --name webServer -d -p 80:80 nginx   
run했을 때 이미지가 없으면 자동으로 pull받아짐    
+ `-d` : 백그라운드에서 실행    
+ `-p` : 포트설정 ( 연결할 나의 포트:상대포트 )   

### 2.3.4 os컨테이너 생성
`docker [container] run [-it] [--name 이름] [실행할이미지] [명령어]`    
ex) docker run -it --name coShell centos /bin/bash    
ex) docker run -itd --name uShell ubuntu    
+ `i` : 화면상에서 입력받기가능
+ `t` : 화면상에 출력가능
+ `d` : 백그라운드실행
+ `--name` : 생성할 컨테이너이름지정
+ `--restart=always` : run할 때 마다 이미지를 기반으로 생성해라

### 2.3.5 하나의 명령어 실행
`docker [container] exec [-it] {컨테이너} {명령어}`     
ex) docker container exec -it coShell /bin/cal    
실행중인 컨테이너에서 하나의 명령어만 실행    

### 2.3.6 실행중인 컨테이너 정보얻기
`docker [container] top {컨테이너명}`

### 2.3.7 컨테이너 제거
`docker container [rm | prune | cf] {컨테이너명}`   
+ `rm` : 해당 컨테이너 삭제   
+ `prune` : 멈춰있는 컨테이너 모두 삭제   

### 2.3.8 종료하지않고 빠져나오기
`ctrl+p+q`    

### 2.3.9 실행중인 컨테이너에 들어가기
`docker [container] attach {컨테이너이름}`    

### 2.3.10 실행중인 컨테이너 종료
`docker [container] stop {컨테이너이름}`    

### 2.3.11 컨테이너 실행
`docker [container] start {컨테이너이름}`   

### 2.3.12 컨테이너 이름변경
`docker [container] rename {현재컨테이너이름} {바꿀컨테이너이름}`   

### 2.3.13 현재 실행중인 컨테이너 아이디모두 출력
`docker ps -q`    

## 3.1 docker image 명령
### 3.1.1 현재 가지고 있는 이미지들 보기
`docker image ls` or `docker images`

<br />
<hr />
<br />

# 4. 설치할만한 컨테이너목록
## 4.1 mysql
`docker pull mysql`   
`docker run -d -p [내포트]:[상대포트] -e [비밀번호환경변수명]=[비밀번호] [--name=mysqll] mysql:[버전]`    
ex) docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mysql --name=mysqll mysql:5.7   
단 현재컴퓨터에 mysql설치되어있으면 3306번이 사용중이므로 다른포트로 변경해야함   

## 4.2 oracle
`docker pull jaspeen/oracle-xe-11g`   
`docker run [--name 컨테이너이름] -d -p [내포트:상대포트] [이미지명]`   
ex) docker run --name oracle11g -d -p 1521:1521 jaspeen/oracle-xe-11g   
단 현재컴퓨터에 oracle설치되어있으면 1521번이 사용중이므로 다른포트로 변경해야함    
```
// 오라클DB관련 명령어
즉시실행 : docker exec -it oracle11g sqlplus
bash들어갔다가 실행 : exec -it oracle bash -> sqlplus
기본id : system
기본pw : oracle
```

## 4.3 mongodb
`docker pull mongo`
`docker run [--name 컨테이너이름] -d -p [내포트:상대포트] [이미지명]`   
ex) docker run --name mongo-db -d -p 27017:27017 mongo    

# 5. 기본 설치 정보
## 5.1 docker for windows설치
https://docs.docker.com/docker-for-windows/install/

## 5.2 dokcer 허브
https://hub.docker.com