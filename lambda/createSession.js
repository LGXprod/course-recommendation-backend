const { getConnection } = require("./common/connectDB");
const querystring = require("querystring");
const { nanoid } = require("nanoid");
const res = require("./common/api_responses");

exports.handler = async (event) => {
  const body = querystring.parse(event.body);
  
  if (body != null && body.id != null && body.password != null) {
    const { id, password } = body;
    const connection = await getConnection();

    try {
      const [ queryResult ] = await connection.execute(`select count(*) as count from students where student_id="${id}" 
                                and password="${password}";`);

      if (queryResult[0].count == 0) {
        connection.end();

        return res._400();
      }

      const session_id = nanoid(12);

      await connection.execute(
        `insert into sessions (session_id, user_id) values ("${session_id}", "${id}")
         on Duplicate Key Update session_id = "${session_id}";`
      );

      connection.end();

      return res._200({ session_id });
    } catch (err) {
      connection.end();
      console.log("err", err);
      return res._400();
    }
  } else {
    return res._400();
  }
};
