const faker = require("faker");

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndFloat(min, max, roundToN) {
  return (Math.random() * (max - min + 1) + min).toFixed(roundToN);
}

function generateData(num_instances) {
  let students = [];

  for (let i = 1; i <= num_instances; i++) {
    students.push({
      fName: faker.name.firstName,
      sName: faker.name.lastName,
      age: getRndInteger(17, 30),
      atar: getRndFloat(50, 99.95, 2),
      fullTimePreferred: Math.random() > 0.5 ? true : false
    });
  }
}

module.exports = {
  generateData,
}