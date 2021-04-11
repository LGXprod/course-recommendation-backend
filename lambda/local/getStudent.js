require("dotenv").config({ path: "../.env" });

(async () => {
  console.log(await require("../getStudent").handler({
    pathParameters: {
      student_id: "1",
      session_id: "hxUSB2Qkish8"
    }
  }));
})();