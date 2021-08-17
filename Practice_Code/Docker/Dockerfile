FROM node:10

WORKDIR /user/src/app

# COPY 복사할파일 복사완료할위치
COPY package*.json ./

RUN npm install

COPY ./ ./

CMD [ "node", "app.js" ]