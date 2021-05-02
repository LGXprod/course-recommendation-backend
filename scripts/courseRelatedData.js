const file = require("./file");

const courseAreasDegrees = require("./scraping/data/courseAreaDegrees.json");
const degreeMajorSubject = require("./scraping/data/degreeMajorSubject.json");
const majorsSubjectDetails = require("./scraping/data/majorsSubjectDetails.json");

function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
          case "\0":
              return "\\0";
          case "\x08":
              return "\\b";
          case "\x09":
              return "\\t";
          case "\x1a":
              return "\\z";
          case "\n":
              return "\\n";
          case "\r":
              return "\\r";
          case "\"":
          case "'":
          case "\\":
          case "%":
              return "\\"+char; // prepends a backslash to backslash, percent,
                                // and double/single quotes
          default:
              return char;
      }
  });
}

// course area and undergraduate degree data in sql insert queries

let courseAreas = "";
let ug_degrees = "";

for (courseAreaName in courseAreasDegrees) {
  courseAreas += `insert into course_areas (courseAreaName) values ("${courseAreaName}");\n`;

  for (degreeCode of courseAreasDegrees[courseAreaName]) {
    ug_degrees += `insert into ug_degrees (degree_id, courseAreaName) values ("${degreeCode}", "${courseAreaName}");\n`;
  }
}

file.write("./insert_queries/course_areas.sql", courseAreas);
file.write("./insert_queries/ug_degrees.sql", ug_degrees);

// major, majors_subjects and core subjects data in sql insert queries

let core_subjects = "";
let majors = "";
let majors_subjects = "";

let subjectTypes = ["majors", "sub-majors", "streams"];

for (degreeCode in degreeMajorSubject) {
  let subjects = degreeMajorSubject[degreeCode].subjects;
  for (core_subject_code in subjects.core) {
    let subject_name = subjects.core[core_subject_code].name;
    core_subjects += `insert into subjects (subject_code, name) values 
                      ("${core_subject_code}", "${subject_name}");\n`;
    core_subjects += `insert into core_subjects (subject_code, degree_id) values 
                      ("${core_subject_code}", "${degreeCode}");\n`;
  }

  for (subjectType of subjectTypes) {
    for (majorCode in subjects[subjectType]) {
      let major = subjects[subjectType][majorCode];

      majors += `insert into majors (major_code, name, type, degree_id) values ("${majorCode}", "${major.name}", "${major.type}", "${degreeCode}");\n`;

      for (subjectCode of major.subjects.core) {
        majors_subjects += `insert into majors_subjects (subject_code, major_code, isElective) values ("${subjectCode}", "${majorCode}", ${false});\n`;
      }

      for (subjectCode of major.subjects.elective) {
        majors_subjects += `insert into majors_subjects (subject_code, major_code, isElective) values ("${subjectCode}", "${majorCode}", ${true});\n`;
      }
    }
  }
}

file.write("./insert_queries/core_subjects.sql", core_subjects);
file.write("./insert_queries/majors.sql", majors);
file.write("./insert_queries/majors_subjects.sql", majors_subjects);

// non core to degree subject data in sql insert queries

let subjects = "";

for (subjectCode in majorsSubjectDetails) {
  let subject = majorsSubjectDetails[subjectCode];

  subjects += `insert into subjects (subject_code, name, credit_points, requisities, 
    anti_requisities, description, content_topics, num_group_assessments, 
    assessment_types) values ("${subjectCode}", "${subject.name}", 
    ${isNaN(parseInt(subject.credit_points)) ? -1 : subject.credit_points}, 
    '${escape(JSON.stringify(subject.requisites))}', '${escape(JSON.stringify(
    subject.anti_requisites
  ))}', 
    '${escape(subject.description)}', '${escape(subject.content_topics)}',
      ${subject.num_group_assessments}, 
    '${escape(JSON.stringify(subject.assessment_types))}');\n`;
}

file.write("./queries/subjects.sql", subjects);
