const commandManager = require("./commands/commandManager");
const fs = require("fs");
const driverManager = require("./entities/driverManager");
const riderManager = require("./entities/riderManager");

// const filename = process.argv[2];
const filename = "sample_input/input.txt";

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw err;
  var inputLines = data.toString().split("\n");
  inputLines.forEach((inputLine) => {
    console.log(inputLine);
    commandManager.processCommand(inputLine);
  });
  commandManager.getResult();
});
