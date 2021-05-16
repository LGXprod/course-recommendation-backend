const subjects = require("./data-final.json");
const file = require("./file");

let queries = "";

for (let subject of subjects) {
  queries += `insert into subjects (subject_code, name, keywords, isGroupAssignments, assessment_types)
              values ("${subject["Subject Number"]}", "${subject["Subject Name"]}", "${subject["Keywords"]}",
              ${subject["Group Assignments"]}, "${subject["Assignment Types"]}");\n`;
}

file.write("./queries/more_subjects.sql", queries);
