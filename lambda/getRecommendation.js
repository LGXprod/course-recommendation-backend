const querystring = require("querystring");
const { getConnection } = require("./common/connectDB");
const res = require("./common/api_responses");
const validSession = require("./common/validSession");

exports.handler = async (event) => {
  const connection = await getConnection();

  console.log("event", event.headers["X-Session_id"]);

  if (event.body == null && event.headers["X-Session_id"] != null) {
    if (await validSession(event.headers["X-Session_id"], connection)) {
      try {
        const [
          queryResult,
        ] = await connection.execute(`SELECT * FROM subjects where credit_points is not null
                                      ORDER BY RAND() LIMIT 8;`);

        connection.end();

        return res._200(queryResult);
      } catch (err) {
        console.log(err);
        return res._400();
      }
    } else {
      connection.end();
      return res._403();
    }
  } else {
    return res._403();
  }
};
