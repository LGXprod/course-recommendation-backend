create database courseRecommender_dev;

use courseRecommender_dev;

create table students (
  fName varchar(50),
  sName varchar(50),
  age TINYINT(1),
  atar FLOAT(2, 2),
  fullTimePreferred boolean,
  hsSubjects mediumtext,
  uniSubjects mediumtext
);