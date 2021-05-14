const fs = require("fs");

function write(filePath, text) {
  return fs.writeFileSync(filePath, text);
}

module.exports = {
  write,
}