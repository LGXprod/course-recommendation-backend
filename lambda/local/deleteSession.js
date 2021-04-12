require("dotenv").config({ path: "../.env" });
const querystring = require("querystring");

(async () => {
  const body = querystring.stringify({
    session_id: "Rt-iJnywcxRI"
  });

  console.log(await require("../deleteSession").handler({
    body
  }));
})();