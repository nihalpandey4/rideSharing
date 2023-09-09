const commandManager = require("./commands/commandManager");
const fs = require("fs");

// const filename = process.argv[2];
const filename = "sample_input/input.txt";

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw err;
  var inputLines = data.toString().split("\n");
  inputLines.forEach((inputLine) => {
    commandManager.processCommand(inputLine);
  });
  commandManager.getResult();
});
