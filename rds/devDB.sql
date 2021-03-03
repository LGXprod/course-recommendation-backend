create database courseRecommender_dev;

create table student (
  fName varchar(50),
  sName varchar(50),
  age TINYINT(1),
  atar FLOAT(2, 2),
  fullTimePreferred boolean,
  coursesTaken mediumtext
);