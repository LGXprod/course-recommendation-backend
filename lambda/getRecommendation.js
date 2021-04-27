const querystring = require("querystring");
const { getConnection } = require("./common/connectDB");
const res = require("./common/api_responses");
const validSession = require("./common/validSession");

exports.handler = async (event) => {
  const connection = await getConnection();

  console.log("event", event);

  if (event.body != null && event.headers.Authorization != null) {
    try {
      const [ queryResult ] = await connection.execute(`SELECT * FROM subjects ORDER BY RAND()
                                                        LIMIT 8;`);
                                             
      connection.end();                                                  

      return res._200(queryResult);
    } catch (err) {
      console.log(err);
      return res._400();
    }
  } else {
    return res._400();
  }
}