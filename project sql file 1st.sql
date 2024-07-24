use project;
create table users(email varchar(30) primary key, pwd varchar(20) ,utype varchar(40) ,ustatus int default '1');
update users set utype='client' where email='biden';
select * from users;
drop table users;


create table Iprofile(emailid varchar(30) primary key ,uname varchar(30) , gender varchar(30), dob date,address varchar(30),city varchar(30),contact int, field varchar(30), insta varchar(30) , facebook varchar(30), youtube varchar(30),ppic varchar(40));
select * from Iprofile;
delete from Iprofile where emailid='modiji';
drop table Iprofile;

create table eventbook(emailid varchar(30) , events varchar(30), doe date , tos time,city varchar(30),venue varchar(30));
select * from eventbook;
drop table eventbook;

create table Cprofile(emailid varchar(30) primary key, uname varchar(20) ,city varchar(30) , state varchar(30), org varchar(30), mobile BIGINT, picpath varchar(30));
select * from Cprofile;
delete from Cprofile where emailid='user103';
drop table Cprofile;

create table contactus( Personid int NOT NULL AUTO_INCREMENT primary key, uname  varchar(30)  , subject varchar(50), emailid varchar(30) ,text varchar(300));
