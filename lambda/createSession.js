const { connection, query } = require("./connectDB");
const querystring = require("querystring");
const { nanoid } = require("nanoid");
const res = require("./api_responses");

exports.handler = async (event) => {
  const body = querystring.parse(event.body);
  
  if (body != null && body.id != null && body.password != null) {
    const { id, password } = body;

    try {
      const student = await query(`select student_id from students where student_id="${id}" 
                              and password="${password}";`);

      console.log("student_id", student[0].student_id);

      const session_id = nanoid(12);

      await query(
        `insert into sessions (session_id, user_id) values ("${session_id}", "${id}");`
      );

      connection.end();

      return res._200({ session_id });
    } catch (err) {
      console.log("err", err);
      return res._400();
    }
  } else {
    return res._400();
  }
};
