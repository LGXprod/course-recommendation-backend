const file = require("./file");
const degrees = require("./scraping/data/degreeMajorSubject.json");

let updateQueries = "";

for (let code in degrees) {
  updateQueries += `update degrees set name = "${degrees[code].name}" where degree_id = "${code}";\n`;
}

file.write("./queries/addDegreeNames.sql", updateQueries);