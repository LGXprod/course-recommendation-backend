require("dotenv").config({ path: "../.env" });

(async () => {
  const res = await require("../getRecommendation").handler({
    body: {
      "need": "params still"
    },
    headers: {
      "authorization": "wefwe"
    }
  });

  console.log(res);
})()