require("dotenv").config({ path: "../.env" });
const querystring = require("querystring");

const createQueryString = (data) => {
  return Object.keys(data).map(key => {
    let val = data[key]
    if (val !== null && typeof val === 'object') val = createQueryString(val)
    return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`
  }).join('&')
}

(async () => {
  const res = await require("../createRecommendation").handler({
    body: querystring.stringify({
      assessmentTypes: JSON.stringify({ lab: true }),
      isGroupWork: false,
      interestingKeywords: JSON.stringify(["fwe", "fwefw", "hrteh"]),
    }),
    headers: {
      "X-Session_id": "4PlYeawOorQK",
    },
  });

  const body = JSON.parse(res.body);
  console.log(res.statusCode);
  console.log(body.message);
})();
