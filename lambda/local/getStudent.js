require("dotenv").config({ path: "../.env" });

(async () => {
  console.log(await require("../getStudent").handler({
    pathParameters: {
      session_id: "43aau_pJNC6R"
    }
  }));
})();