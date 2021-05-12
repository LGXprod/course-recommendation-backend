const querystring = require("querystring");
const { getConnection } = require("./common/connectDB");
const res = require("./common/api_responses");
const validSession = require("./common/validSession");

exports.handler = async (event) => {
  const body = querystring.parse(event.body);

  if (body != null && body.session_id != null) {
    const connection = await getConnection();

    try {
      if (await validSession(body.session_id, connection)) {
        await connection.execute(
          `delete from sessions where session_id = "${body.session_id}";`
        );

        connection.end();

        return res._200();
      } else {
        connection.end();
        return res._400({ message: "user doesn't have a session" });
      }
    } catch (err) {
      connection.end();
      console.log(err);
      return res._400();
    }
  } else {
    return res._400();
  }
};
