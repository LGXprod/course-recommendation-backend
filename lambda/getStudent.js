const { connection, query } = require("./common/connectDB");
const res = require("./common/api_responses");
const validSession = require("./common/validSession");

exports.handler = async (event) => {
  const pathParams = event.pathParameters;
  if (
    pathParams != null &&
    pathParams.student_id != null &&
    pathParams.session_id != null
  ) {
    try {
      const { student_id, session_id } = pathParams;

      if (await validSession(student_id, session_id, query)) {
        const queryResult = await query(`select student_id, fName, sName, age, fullTimePreferred, 
                                      completedSubjects, degree_id from students
                                      where student_id = "${student_id}";`);

        connection.end();

        if (queryResult.length == 0) {
          return res._400({ message: "student id doesn't exist" });
        } else {
          return res._200(queryResult[0]);
        }
      } else {
        return res._400({ message: "user doesn't have a session" });
      }
    } catch (err) {
      console.log("err", err);
      return res._400();
    }
  } else {
    return res._400();
  }
};
