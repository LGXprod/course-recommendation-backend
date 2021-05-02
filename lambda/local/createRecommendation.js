require("dotenv").config({ path: "../.env" });
const qs = require("qs");

(async () => {
  const body = qs.stringify({
    assessmentTypes: { lab: true, exam: false, project: true },
    isGroupWork: false,
    interestingKeywords: ["math", "science", "hrteh"],
  });
  console.log(body);

  const res = await require("../createRecommendation").handler({
    body,
    headers: {
      "X-Session_id": "4PlYeawOorQK",
    },
  });

  // const body = JSON.parse(res.body);
  // console.log(res.statusCode);
  // console.log(body.message);
})();
