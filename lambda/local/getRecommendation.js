require("dotenv").config({ path: "../.env" });

(async () => {
  const res = await require("../getRecommendation").handler({
    body: {
      "need": "params still"
    },
    headers: {
      "X-Session_id": "wefwe"
    }
  });

  console.log(res);
})()