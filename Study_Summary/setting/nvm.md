# NVM
노드버전매니저로 프로젝트마다 쉽게 원하는 버전을 사용가능    
[여기](https://github.com/nvm-sh/nvm#installing-and-updating)참고   

## 1. NVM설치
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`

## 2. bash설정
bash에서 NVM을 인식못하므로 설정파일을 만들어야함   
1. `~/.bashrc`파일 생성
2. 밑에꺼 파일에 추가
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
3. bash 재부팅

## 3. 버전교체 및 설치
1. 설치 : `nvm i 12.14.0`
2. 교체 : `nvm use 12.14.0`
( 윈도우에서는 안되가지고 밑에줄 참고 )

## window기준 설치
[여기](https://github.com/coreybutler/nvm-windows/releases)에서 `nvm-setup.zip`다운후 설치    
사용법은 같음 단, `cmd`같은 프롬프트창에서 사용해야함