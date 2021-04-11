const { connection, query } = require("./common/connectDB");
const querystring = require("querystring");
const res = require("./common/api_responses");

exports.handler = async (event) => {
  if (event.body != null) {
    const {
      student_id,
      password,
      fName,
      sName,
      age,
      fullTimePreferred,
      completedSubjects,
      degree_id,
    } = querystring.parse(event.body);

    try {
      await query(`insert into students (student_id, password, fName, sName, age, 
        fullTimePreferred, completedSubjects, degree_id) values ("${student_id}", "${password}", 
        "${fName}", "${sName}", ${age}, ${fullTimePreferred}, '${escape(JSON.stringify(completedSubjects))}', 
        "${degree_id}");`);

      connection.end();

      return res._200();
    } catch (err) {
      console.log("error", err);
      return res._400();
    }
    
  } else {
    return res._400();
  }
};
