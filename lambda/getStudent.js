const { getConnection } = require("./common/connectDB");
const res = require("./common/api_responses");
const validSession = require("./common/validSession");

exports.handler = async (event) => {
  const pathParams = event.pathParameters;
  if (pathParams != null && pathParams.session_id != null) {
    const connection = await getConnection();

    try {
      const { session_id } = pathParams;

      const student_id = await validSession(session_id, connection, true);

      if (student_id != null) {
        const [
          studentDetails,
        ] = await connection.execute(`select student_id, fName, sName, age, 
                                                    fullTimePreferred, completedSubjects, 
                                                    degree_id, isNewUser from students
                                                    where student_id = "${student_id}";`);

        const [
          courseName,
        ] = await connection.execute(`select name from degrees where 
                                                        degree_id = "${studentDetails[0].degree_id}";`);

        connection.end();

        if (studentDetails.length == 0) {
          return res._400({ message: "student id doesn't exist" });
        } else {
          return res._200({ ...studentDetails[0], courseName: courseName[0].name });
        }
      } else {
        connection.end();
        return res._400({ message: "user doesn't have a session" });
      }
    } catch (err) {
      connection.end();
      console.log("err", err);
      return res._400();
    }
  } else {
    return res._400();
  }
};
