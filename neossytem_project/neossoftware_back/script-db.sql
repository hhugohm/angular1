CREATE SCHEMA neossoftwaredb DEFAULT CHARACTER SET utf8 ;

CREATE TABLE neossoftwaredb.te_user (
  id_user INT NOT NULL  COMMENT '',
  name VARCHAR(45) NOT NULL COMMENT '',
  lastname VARCHAR(45) NOT NULL COMMENT '',
  email VARCHAR(45) NOT NULL COMMENT '',
  password VARCHAR(45) NOT NULL COMMENT '',
  create_date DATE NOT NULL COMMENT '',
  update_date DATE NOT NULL COMMENT '',
  status TINYINT(1) NOT NULL DEFAULT 0 COMMENT '',
  UNIQUE INDEX email_UNIQUE (email ASC)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'This table has all user of neossoftware system';

ALTER TABLE neossoftwaredb.te_user  CHANGE COLUMN id_user id_user INT(11) NOT NULL AUTO_INCREMENT COMMENT '' ,
ADD PRIMARY KEY (id_user)  COMMENT '';

INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Hector Hugo','Hidalgo','hhugohm@icloud.com','12345678','2005-01-01','2005-01-01',1);
INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Mario','Hidalgo','mario.hidalgo@icloud.com','12345678','2005-01-01','2005-01-01',1);
INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Veronica','Colin','vero_cc@icloud.com','12345678','2015-01-01','2015-01-01',1);
INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Janet','Hidalgo','janet.hidalgo@gmail.com','12345678','2016-01-01','2016-01-01',1);
INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Judith','Hidalgo','judith.hidalgo@gmail.com','12345678','2016-02-01','2016-02-01',1);
INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Emiliano','Hidalgo','emiliano.hidalgo@gmail.com','12345678','2016-03-01','2016-02-01',1);
INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Jessica','Hidalgo','jessica.hidalgo@gmail.com','12345678','2016-04-01','2016-04-01',1);
INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Genaro','Martinez','genaro.martinez@gmail.com','12345678','2016-05-01','2016-05-01',0);
INSERT INTO neossoftwaredb.te_user (name,lastname,email,password,create_date,update_date,status) values ('Alicia','Rincon','alicia.rincon@gmail.com','12345678','2016-05-01','2016-05-01',0);


#DROP TABLE neossoftwaredb.te_user;
#DROP DATABASE neossoftwaredb;