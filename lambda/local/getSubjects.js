require("dotenv").config({ path: "../.env" });
const getSubjects = require("../getSubjects");

(async () => {
  console.log(await getSubjects.handler({
    headers: {
      "X-Session_id": "foHaEz2d0n8x"
    }
  }));
})()