require("dotenv").config({ path: "../.env" });
const querystring = require("querystring");

(async () => {
  const body = querystring.stringify({
    id: "1",
    password: "password",
  });

  console.log(
    await require("../createSession").handler({
      body,
    })
  );
})();
