require("dotenv").config({ path: "../.env" });
const querystring = require("querystring");
const createStudent = require("../createStudent");

(async () => {
  const body = querystring.stringify({
    student_id: "6",
    password: "password",
    fName: "fwefw",
    sName: "wedfwefw",
    age: 18,
    fullTimePreferred: true,
    completedSubjects: [21036, 21037, 21129, 21407],
    degree_id: "c10026",
  });
  
  const res = await createStudent.handler({ body });

  console.log(res);
})();