const faker = require("faker");
const courseAreaDegrees = require("./scraping/data/courseAreaDegrees.json");
const degreeMajorSubject = require("./scraping/data/degreeMajorSubject.json");

// delete empty course areas from the loaded var
for (let courseArea in courseAreaDegrees) {
  if (courseAreaDegrees[courseArea].length === 0) {
    delete courseAreaDegrees[courseArea];
  }
}

const courseAreaKeys = Object.keys(courseAreaDegrees);
const degreeSubjectKeys = Object.keys(degreeMajorSubject);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndFloat(min, max, roundToN) {
  return (Math.random() * (max - min + 1) + min).toFixed(roundToN);
}

function getSubjectData() {
  let subjects = [];

  const courseAreaIndex = getRndInteger(0, courseAreaKeys.length-1);

  const degrees = courseAreaDegrees[courseAreaKeys[courseAreaIndex]];

  const degreeSubjectIndex = getRndInteger(0, degrees.length-1);

  const degree_id = degrees[degreeSubjectIndex];
  console.log(degreeSubjectIndex, degree_id);

  const num_core_subjects = getRndInteger(0, Object.keys(degreeMajorSubject[degree_id].subjects.core).length);
  let num_major_subjects;
  let num_submajor_subjects;
  let num_stream_subjects;

  if (Object.keys(degreeMajorSubject[degree_id].subjects.majors).length == 0) {
    console.log(Object.keys(degreeMajorSubject[degree_id].subjects.majors).length)
    num_major_subjects = getRndInteger(0, Object.keys(degreeMajorSubject[degree_id].subjects.majors).length);
  } else {
    num_major_subjects = null;
  }

  if (Object.keys(degreeMajorSubject[degree_id].subjects["sub-majors"]).length == 0) {
    num_submajor_subjects = getRndInteger(0, Object.keys(degreeMajorSubject[degree_id].subjects["sub-majors"]).length);
  } else {
    num_submajor_subjects = null;
  }

  if (Object.keys(degreeMajorSubject[degree_id].subjects.streams).length == 0) {
    num_stream_subjects = getRndInteger(0, Object.keys(degreeMajorSubject[degree_id].subjects.streams).length);
  } else {
    num_stream_subjects = null;
  }

  console.log(num_core_subjects, num_major_subjects, num_submajor_subjects, num_stream_subjects)

  // for (let subject_id in degreeMajorSubject[degree_id].subjects.core) {
  //   console.log(subject_id, degreeMajorSubject[degree_id].subjects.core[subject_id]);
  // }


}

getSubjectData();

function generateData(num_instances) {
  let students = [];
  

  for (let i = 1; i <= num_instances; i++) {
    students.push({
      student_id: getRndInteger(100000, 999999),
      password: faker.internet.password,
      fName: faker.name.firstName,
      sName: faker.name.lastName,
      age: getRndInteger(17, 30),
      fullTimePreferred: Math.random() > 0.5 ? true : false,
    });
  }
}
