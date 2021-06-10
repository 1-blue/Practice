# 데이터베이스관련 명령어
1. 데이터베이스생성 : `use 데이터베이스명`    
2. 사용중인 데이터베이스 조회 : `db;`    
3. 전체 데이터베이스 조회 : `show dbs;`    
4. 데이터베이스 상태확인 : `db.stats();`    
5. 데이터베이스 삭제 : `db.dropDatabase();`    


# 컬렉션관련 명령어
1. 생성 : `db.createCollection(name, [options]);`
2. 조회 : `show collections;`
3. 삭제 : `db.컬렉션명.drop();`

# 도큐먼트관련 명령어
1. 추가 : `db.컬렉션명.insert({ "key" : "value" });`
2. 검색 : `db.컬렉션명.find({ "key" : "value" });`
3. 삭제 : `db.컬렉션명.remove({ "key" : "value" });`