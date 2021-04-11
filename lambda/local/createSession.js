require("dotenv").config({ path: "../.env" });
const querystring = require("querystring");

(async () => {
  const body = querystring.stringify({
    id: "2",
    password: "password2",
  });

  console.log(
    await require("../createSession").handler({
      body,
    })
  );
})();
