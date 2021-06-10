+ []생략가능
+ 대문자 => 명령어
+ 소문자 => 입력해야할거

## 1. DB생성 + (문자열세팅)
`CREATE DATABASE 디비명 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;` ( 문자설정도 같이하는것 )    
기본적으로 column들은 테이블설정을 따라가고 테이블은 DB설정을 따라가기때문에    
애초에 DB에서 문자설정을 해주면 테이블과 column을 설정할필요가 거의 없음    

## 2. 사용자생성 및 권한부여
### 2.1 사용자생성
```sql
// 형식.. host자리엔 호스트 적어줘야함 ( ex)'localhost', '%' )
CREATE user 사용자명[@'host' IDENTIFIED BY '비밀번호'];

// 사용
CREATE user testUser@'localhost' IDENTIFIED BY '1234';
```

### 2.2 사용자 조회
```sql
use mysql;
SELECT host, user FROM user;  
```

### 2.3 사용자 삭제
```sql
// 형식
drop user 사용자명@'host';

// 사용
DROP user testUser@'localhost';
```

### 2.3 권한부여
```sql
// 형식
GRANT ALL PRIVILEGES ON DB명.테이블명 TO 사용자명@'host' [IDENTIFIED BY '비밀번호'];

// 사용
GRANT ALL PRIVILEGES ON testDB.* TO 'testUser'@'localhost' [IDENTIFIED BY '비밀번호'];
```
DB에 해당하는 테이블에만 CRUD권한부여   
단 *사용시 모든것에 권한부여됨 (host는 %사용)   
ALL대신 select, insert, update, delete등을 사용하면 각각의 권한을 부여할 수 있음    

### 2.4 권한적용
```sql
flush privileges;
```

### 2.5 권한확인
```sql
// 형식
SHOW GRANTS FOR 사용자명@'host';

// 사용
SHOW GRANTS FOR testUser@'localhost';
```

### 2.6 비밀번호 부여 및 변경 및 확인
이유는 모르겠으나 권한부여할 때 비밀번호가 입력이 안되가지고 다른방법을 찾음    
```sql
// 현재암호 확인... 인데 암호화되어있네..? 다른 방법찾기
SELECT host, user, authentication_string FROM user;

// 비밀번호변경형식
ALTER user 사용자명@'host' IDENTIFIED WITH mysql_native_password BY '변경할비밀번호';

// 비밀번호변경사용... 이것도 안되는데 이유 찾아보기
ALTER user 'testUser'@'host' IDENTIFIED WITH mysql_native_password BY '12345';
```


## 3. 테이블 및 데이터 관리
### 3.1 테이블생성
```sql
// 형식
CREATE TABLE 테이블명 ( column정의 );

// 사용
CREATE TABLE testTable (
  id integer not null primary key,
  name varchar(20) not null
);
```

### 3.2 테이블형태검색
```sql
// 형식
DESC 테이블명;

// 사용
DESC testTable;
```

### 3.3 데이터추가
```sql
// 형식
INSERT INTO 테이블명 VALUES( 데이터들 );

// 사용
INSERT INTO testTable name VALUES(1, 'john');
```

### 3.4 데이터수정
```sql
// 형식
UPDATE 테이블명 SET 수정할데이터 WHERE 조건;

// 사용
UPDATE testTable SET name = 'blue' WHERE id = 1;
```

### 3.5 특정데이터검색
```sql
SELECT * FROM 테이블명 WHERE 조건;
SELECT [distinck] column명 FROM 테이블명;         // distinck는 검색될 데이터중에서 중복제거
SELECT * FROM 테이블명 ORDER BY column명 [DESC];  // 검색후 정렬후 중복제거후 출력 ( 정렬기준은 column명, DESC는 내림차순 )
```

### 3.6 JOIN
테이블을 합쳐서 보여주는 명령어임

||book테이블||||author테이블||
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|name|author_id||id|name|age|
|1|bn1|1||1|j|21|
|2|bn2|2||2|k|33|
|3|bn3|1||3|h|31|
|4|bn4|4||5|a|55|

```sql
SELECT (출력할거) FROM 테이블명 [사용할 join] 테이블명 ON (join의 조건) [WHERE 출력할 row에 대한 조건];
```

#### 3.6.1 LFET JOIN
book의 author_id컬럼에 해당하는 id값과 author에 해당하는 id가 같을경우 author를 붙여서 출력해줌   
book.id = 4 처럼 author에 해당하는게 없는경우에는 NULL로 모두채워서 보여줌
```sql
SELECT * FROM book LEFT JOIN author on book.author_id = author.id;
```
||출력결과|||
|:---:|:---:|:---:|:---:|
|book.id|book.name|author.name|author.age|
|1|bn1|j|21|
|2|bn2|k|33|
|3|bn3|j|21|
|4|bn4|null|null|

#### 3.6.2 INNER JOIN
LEFT JOIN과 같은데 해당하는게 없을경우 row를 삭제함   
```sql
SELECT * FROM book INNER JOIN author on book.author_id = author.id;
```
||출력결과|||
|:---:|:---:|:---:|:---:|
|book.id|book.name|author.name|author.age|
|1|bn1|j|21|
|2|bn2|k|33|
|3|bn3|j|21|

#### 3.6.3 OUTER JOIN
LEFT JOIN과 RIGHT JOIN을 합쳐서 출력하고 중복된것은 제거해서 보여줌   
이것을 지원하지않는경우가 많아서 굳이하려면 (LEFT JOIN) UNION (RIGHT JOIN)을 해주면됨
```sql
SELECT * FROM book OUTER JOIN author on book.author_id = author.id;
```
||출력결과|||
|:---:|:---:|:---:|:---:|
|book.id|book.name|author.name|author.age|
|1|bn1|j|21|
|2|bn2|k|33|
|3|bn3|j|21|
|4|bn4|null|null|
|null|null|h|31|
|null|null|a|55|

### 3.7 INSERT SELECT문
```sql
// 형식
INSERT INTO 추가할테이블명(추가할컬럼명) SELECT 찾을컬럼명 FROM 찾을테이블명 WHERE 조건;

// 사용
INSERT INTO test(name) SELECT name FROM person WHERE id < 5;

// person테이블의 id > 5인 name을 가져와서 test테이블의 name에다가 넣어라
```

## 4. 테이블수정
### 4.1 테이블구조변경
```sql
ALTER TABLE 테이블명 [ENGINE | AUTO_INCREMENT | COMMENT | RENAME]
//                   기본엔진,     시작숫자,       주석,    이름
```

### 4.2 기본형태
```sql
// 형식
ALTER TABLE 테이블명 [ADD | MODIFY | CHANGE | DROP] COLUMN column명

// 사용
ALTER TABLE testTable ADD COLUMN age VARCHAR(10);              // 추가
ALTER TABLE testTable MODIFY COLUMN age INTEGER;               // 수정
ALTER TABLE testTable CHANGE COLUMN age birth VARCHAR(40);     // 이름과 컬럼내용 수정
ALTER TABLE testTable DROP COLUMN birth;                       // 컬럼삭제
```
단 컬럼을 수정할 때는 연관되어있는지, 자료형이 맞는지, 기본값유무에 따라서 확실하게 수정해줘야함

### 4.3 column추가
```sql
// 형식
ALTER TABLE 테이블명 ADD column명 ( 데이터정보 타입, not null 등);

// 사용
ALTER TABLE testTable ADD COLUMN age VARCHAR(10);
```
### 4.4 column삭제
```sql
// 형식
ALTER TABLE 테이블명 DROP COLUMN column명

// 사용
ALTER TABLE testTable DROP COLUMN birth;
```

### 4.5 coulmn 디폴트값 변경
```sql
// 형식
ALTER TABLE 테이블명 ALTER COLUMN column명 set default 디폴트값;

// 사용
ALTER TABLE testTable ALTER COLUMN name set default '무명';
```

### 4.6 column 타입 변경
```sql
// 형식
ALTER TABLE 테이블명 MODIFY 컬럼명 변경할타입;

// 사용
ALTER TABLE testTable MODIFY name VARCHAR(100);   // 기존에 들어가 있는 값 조심
```
기존에 디폴트값은 사라짐

### 4.7 column 위치 변경
```sql
// 형식
ALTER TABLE 테이블명 MODIFY column명 column타입 AFTER 앞에올column명;

// 사용
ALTER TABLE testTable MODIFY id integer AFTER name;
```
기존 `desc testTable;`시 출력결과 id, name순서였지만 그 순서를 바꾼 것

## 4.8 column 이름 변경
```sql
// 형식
ALTER TABLE 테이블명 CHANGE column명 바꿀column명 column타입;

// 사용
ALTER TABLE testTable CHANGE name fullname varchar(100);
```

## 4.9 테이블비우기
```sql
// 1. 기본값까지 제거 ( auto_increment시작값같은거 )
truncate 테이블명;

// 2. 내부 row만 모두 제거
delete from table 테이블명;
```

### 4.10 테이블정보보기
```sql
show table status;
```

### 4.11 테이블 이름 변경
```sql
// 형식
ALTER TABLE 현재이름 RENAME 변경할이름;

// 사용
ALTER TABLE testTable RENAME test;
```

### 4.12 테이블 백업
```sql
create table 백업테이블명 like 백업할테이블명;          // ( 명세만 복사됨 )
insert into 백업테이블명 select * from 백업할테이블명;  // ( 값까지 복사 )
```

## 5. foreign key
다른 테이블과의 연관관계를 표현할 때 사용함   
```sql
// 테이블 정의시
// 형식
[CONTSTRAINT] foreign key [인덱스명](참조할column) REFERENCES 참조당할테이블(참조당할column) [ON (DELETE | UPDATE) (RESTRICT | CASCADE | SET NULL | NOACTION | SET DEFAULT)]

// 사용
CONTSTRAINT foreign key fk_author_book(id) REFERENCES book author_id ON DELETE CASCADE;

// author.id와 book.author_id를 연결시킨 것 

// 테이블 정의 후
// 형식
ALTER TABLE [추가할테이블명] ADD CONTSTRAINT [제약조건명] foreign key(컬럼명) REFERENCES [부모테이블명] (PK컬럼명) [ON (DELETE | UPDATE) (RESTRICT | CASCADE | SET NULL | NOACTION | SET DEFAULT)]

// 사용
ALTER TABLE author ADD CONTSTRAINT pk_author_book foreign key(id) REFERENCES book(author_id) ON DELETE CASCADE;
```
기본적으로 ON DELETE를 자주사용하므로 DELETE기준으로 설명함   
1. RESTRICT : 기본값으로 참조된 데이터가 삭제될경우 에러표시
2. CASCADE : 참조된 데이터가 삭제될경우 같이 삭제
4. SET NULL : 참조된 데이터가 삭제될경우 NULL로 대체
5. NOACTION : 참조된 데이터가 삭제될경우 그냥 그대로 놔둠
6. SET DEFAULT : 참조된 데이터가 삭제될경우 DEFAULT로 대체

## 6. SELECT 조건
### 6.1 LIKE
```sql
WHERE name [NOT] LIKE '%주%';
// name에 '주'를 포함되는 사람 모두 찾기
```
### 6.2 IN
```sql
WHERE name [NOT] IN ('주민성', '배주성');   // (name = '주민성' or name = '배주성' 과 같음)
// name이 주민성, 배주성인 사람 찾기
```

### 6.3 BETWEEN
```sql
WHRER id [NOT] BETWEEN 10 and 20;   // (id > 10 and id < 20 과 같음)
// id가 10~20인 사람 찾기
```

### 6.4 DISTINCT
```sql
SELECT DISTINCT(name) FROM person WHERE name like '김%';
// 김씨중에서 동명이인빼고 name찾아서 출력
```

### 6.5 COUNT
```sql
SELECT COUNT(DISTINCT name) FROM person WHERE name like '김%';
// 김씨중에서 동명이인빼고 몇명인지 출력
```

### 6.6 ORDER BY [RAND()]
```
SELECT * FROM person ORDER BY name [DESC] [RAND()]
// person을 모두 name순 정렬해서 출력
// DESC, RAND()는 단어 그대로 해석하면됨
```

### 6.7 LIMIT
```sql
SELECT * FROM person LIMIT [X], [Y];
// X번째부터 Y개 출력
// 10, 20일경우 PRIMARY KEY순으로 정렬되어 있다면
// id = 10 ~ 30이 출력됨
```

### 6.8 GROUP BY
```sql
SELECT address, count(*) , avg(score) FROM person GROUP BY address;
// address를 기준으로 같은 애들은 하나의 그룹으로 묶어서 출력함
// 일반적으로 출력하면 맨처음 하나만 출력되고 count(*)붙이면 각 그룹이 몇개인지 출력됨
```

### 6.9 GROUP BY에서 조건걸기
```sql
SELECT address, count(*) as cnt , avg(score) FROM person GROUP BY address having cnt > 330;
// 위같은형식으로 group by의 결과값에 조건을 걸려면 having을 사용하면됨
```

## 7. 자료형
### 7.1 DATETIME
4바이트짜리 시간    
입력된 시간에서 변경사항없음    

### 7.2 TIMESTAMP
8바이트짜리 시간    
입력된 시간에서 time_zone에 의존해서 시간이 맞춰짐    

### 7.3 현재시간 / 업데이트시간
```sql
DEFAULT CURRENT_TIMESTAMP [ON UPDATE CURRENT_TIMESTAMP]
```
생성된 현재시간을 테이블에 넣고     
ON UPDATE는 업데이트 될 때 마다 시간을 넣음

# 함수는 사용을 거의 안해봐서 나중에 정리함

## 8. 함수
### 8.1 날짜계산한수
SELECT *, TIMESTAMPDIFF(단위, 날짜1, 날짜2) AS 대체할column명 FROM 테이블명;
날짜2 - 날짜1의 단위만큼의 차이를 계산해서 테이블에 As뒤에값의 이름인 column을 붙여서 출력해줌
날짜2는 대부분 CURDATE()사용
CURDATE() => 현재 날짜
단위는 YEAR, MONTH 등등 년도 ~ 초 까지 많이 있음 찾아서 쓰면됨

#### 2. LIKE
SELECT * FROM 테이블명 WHERE name LIKE ('%P%')
1. %p => p로 끝나는거 찾음
2. p% => p로 시작하는거 찾음
3. %p% => p를 포함하는거 찾음
%는 어떤글자던간에 여러글자상관없고
_는 어떤글자던간에 한글자만

## 3. REGEXP__LIKE
정규 표현식과 같은형식으로 사용

## 4. COUNT(*)
SELECT spicies, COUNT(*) FROM 테이블명;
spicies가 각각 몇개인지 개수출력해줌
레코드의 수

## 5. SUM()
그룹에다가 sum(score) 처럼하면 그룹내부의 score의 합이 나옴

## 6. AVG()
마찬가지로 그룹에다가 걸어야함

## 7. MOD()
나누기

## 8. STDEV()
표준편차

## 9. VAR_SAMP()
분산

## 10. CAST()
형변환연산자
CAST(기존값 AS 변환할자료형);
SELECT CAST('2018-12-31 11:22:22.123' AS DATATIME);

## 11. CONVERT
CONVERT(기존값, 변환할자료형);

## 12. NOW()

## 13. str_to_date()
str_to_date('기존날짜', '출력형태');
str_to_date('2019/12/31', '%Y/%m/%d');

## 14. CONCAT
문자열 합치는 연산자
# 1. CONCAT('aaa', 'bbb');
aaabbb
# 2. CONCAT__ws('|', 'aaa', 'bbb');
aaa|bbb
# 03. group_concat()
group by로 묶은 것들을 모두 출력할 때 사용
ex) select address, group_concat(name) from students group by address;
address로 묶은 그룹안에 각각의 이름을 전부 출력해줌

## 15. IF()
IF(조건, 참일때, 거짓일때)

## 16. IFNULL()
IFNULL(조건, 거짓일때출력);

## 17. date_format()
date_format("시간", "포멧형식");
대표적인포멧형식
%Y : 년도
%M : 알파벳 month
%m : 숫자 month
%d : 숫자 day
%H : 24시간제
%h : 12시간제
%i : 분
%s : 초

###### =================== TRANSACTION ===================
데이터를 세이브하고 쿼리문을 실행할 때 사용
# 1. START TRANSACTION    => 세이브시작
# 2. 데이터를 변환시킬 쿼리문을 입력함
# 3-1. COMMIT;      => 입력했던 쿼리문들을 적용시킴
# 3-2. ROLLBACK;    => 입력했던 쿼리문 적용안함

###### =================== 추가로 알아야할것 ===================
## 세션아이디보기
기본적으로 DB에 접속하면 DB에서 세션을 하나 생성함
SHOW processlist

## index
책의 목차같은 느낌으로 새로운 저장공간을 하나 만들어서 index들을 정리해둠 ( 메모리에 올라가있으므로 검색속도↑ )
자주 select, join, order by 등의 명령을 내리는 값들에게 index를 부여해주면 속도가 빨라짐

unique는 값이 유일하고 메모리에 올림
fulltext는 자주 검색하는 text일경우 지정
primary는

모두 메모리에 올려둠으로서 검색속도가 빨라짐

###### =================== VIEW ===================
기존에 입력해야할 긴 명령어를 변수에 저장하듯 사용할 수 있음
## 1. view 생성
CREATE VIEW view이름 AS 대신할 명령어;
JOIN같은거 여러번쓰거나 반복적으로 사용할 때 VIEW로 정의해두고 사용하면 편함

[간단예시]
CREATE VIEW str as select * from students where address = '진주';
select * from str;  === ( select * from students where address = '진주');
( 거주지 진주인 학생만 출력해줌 )

## 2. view 삭제
DROP VIEW view이름;

