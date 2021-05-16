const { getConnection } = require("./common/connectDB");
const res = require("./common/api_responses");
const validSession = require("./common/validSession");

exports.handler = async (event) => {
  if (event.headers["X-Session_id"] != null) {
    const connection = await getConnection();

    try {
      const student_id = await validSession(
        event.headers["X-Session_id"],
        connection,
        true
      );

      if (student_id != null) {
        const [subject_ids] =
          await connection.execute(`select completedSubjects from students
                                                          where student_id = "${student_id}";`);

        const completedSubjects = JSON.parse(
          unescape(subject_ids[0].completedSubjects).split('"').join("")
        );

        let query_values = "";

        for (let i in completedSubjects) {
          if (i == completedSubjects.length - 1) {
            query_values += `"${completedSubjects[i]}"`;
          } else {
            query_values += `"${completedSubjects[i]}", `;
          }
        }

        const [subjectsDetails] =
          await connection.execute(`select subject_code, name from subjects 
                                    where subject_code in (${query_values})`);

        // because there are duplicates in the database I am going to remove them here as it
        // is the quickest way to fix the issue as subject_code is not a primary key

        let marked_subject_codes = new Set();

        let reduced_subjectsDetails = [];

        for (let subject of subjectsDetails) {
          if (!marked_subject_codes.has(subject.subject_code)) {
            reduced_subjectsDetails.push(subject);
            marked_subject_codes.add(subject.subject_code);
          }
        }

        connection.end();

        return res._200({ subjects: reduced_subjectsDetails });
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
