# Node-Bird
React-Node로 만드는 클론 트위터		

## 일지
1. 1일차 : next적용한 front영역 ( 메인, 로그인, 회원가입, 내정보 )    
2. 2일차 : redux적용 + 게시글폼 ⦁ 게시글컴포넌트 추가 ( 임시데이터사용 )    
3. 3일차 : 임시데이터를 이용해서 comments, 게시글의 image임시구현   
4. 4일차 : redux-saga적용
5. 5일차 : redux-saga이용해서 게시글 및 댓글 업로드하는 로직 추가 + 게시글 삭제 로직 추가
6. 6일차 : faker패키지를 이용해서 더미데이터크리에이터 생성 및 무한 스크롤링 구현
7. 7일차 : follow, unfollow기능 구현
8. 8일차 : sequelize를 이용한 테이블 생성 및 관계설정 + server측 eslint설정
9. 9일차 : front-back 연동, 회원가입, 로그인, 로그아웃 구현
10. 10일차 : front-back 연동 게시글과 댓글 ( 게시글 업로드, 댓글 업로드, 게시글 로드 일부분만 )
11. 11일차 : front-back 연동 게시글 좋아요 구현
12. 12일차 : front-back 연동 게시글 삭제, 닉네임 변경 구현 + 각종에러수정
13. 13일차 : front-back 연동 게시글에 이미지 업로드 기능 추가 (multer)
14. 14일차 : front-back 연동 리트윗, lastId방식 무한스크롤링 구현 + 코드정리 ( 메시지 처리 및 에러처리 )
15. 15일차 : SSR적용 ( Home, Profile )

## 해야할것
1. follow버튼 전부 동일한 변수사용하는것 개별적으로 사용하도록 변경
2. saga, reducer, action, type 각각 한 파일에 너무 많아서 분리가능하면 분리하기
3. 게시글 로드시 limit과 offset 방법 바꿔보기

## 이해안가는것
1. next.js로 적용한 SSR이 어떤 방식으로 적용시키는건지 아직 모호함 ( 그냥 외워야하는건지 이해해야하는건지 모르겠음 )

## 사용한거
1. react
2. mysql ( useing docker )
3. next
4. redux-saga
5. antd
6. styled-components
7. sequelize
8. passport