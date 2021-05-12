create database crDB;

use crDB;

create table students (
  student_id varchar(50) not null,
  password varchar(50) not null,
  fName varchar(50),
  sName varchar(50),
  age smallint,
  fullTimePreferred boolean,
  completedSubjects mediumtext,
  degree_id varchar(8)
);

create table course_areas (
  courseAreaName varchar(50) not null
);

create table ug_degrees (
  degree_id varchar(8) not null,
  courseAreaName varchar(50) not null
);

create table majors (
  major_code varchar(10) not null,
  name varchar(50),
  type varchar(10),
  degree_id varchar(8)
);

create table majors_subjects (
  subject_code varchar(8),
  major_code varchar(10),
  isElective boolean
);

create table subjects (
  subject_code varchar(8) not null,
  name varchar(50),
  credit_points smallint,
  requisities mediumtext,
  anti_requisities mediumtext,
  result_type varchar(25),
  description mediumtext,
  content_topics mediumtext,
  num_group_assessments smallint,
  assessment_types mediumtext
);

create table staff_permissions (
  staff_id varchar(50),
  domain_id varchar(50)
);

create table staff (
  staff_id varchar(50) not null,
  password varchar(50),
  role varchar(50),
  fName varchar(50),
  sName varchar(50)
);

create table core_subjects (
  subject_code varchar(8) not null,
  degree_id varchar(8) not null
);

create table sessions (
  session_id varchar(100) not null,
  user_id varchar(50) not null
);

alter table sessions drop primary key, add primary key(user_id);