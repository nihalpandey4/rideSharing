const routeManager = require("./routeManager");
const fs = require("fs");

// const filename = process.argv[2];
const filename = "sample_input/input1.txt";

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw err;
  var inputLines = data.toString().split("\r\n");
  inputLines.forEach((inputLine) => {
    routeManager.processCommand(inputLine);
  });
  routeManager.getResult();
});
