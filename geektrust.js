const commandManager = require("./commands/commandManager");
const fs = require("fs");
const driverManager = require("./entities/driverManager");
const riderManager = require("./entities/riderManager");

const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw err;
  var inputLines = data.toString().split("\n");
  inputLines.forEach((inputLine) => {
    commandManager.processCommand(inputLine);
  });
  commandManager.getResult();

  console.log(driverManager);
  console.log(riderManager);
});
