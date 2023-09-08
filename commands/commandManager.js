const DriverManager = require("../entities/driverManager");
const RiderManager = require("../entities/riderManager");

class CommandManager {
  constructor() {
    this.result = "";
  }

  processCommand(command) {
    const args = command.split(" ");
    const action = args[0];

    switch (action) {
      case "ADD_DRIVER":
        this.addDriver(args[1], parseFloat(args[2]), parseFloat(args[3]));
        break;
      case "ADD_RIDER":
        this.addRider(args[1], parseFloat(args[2]), parseFloat(args[3]));
        break;
      // case 'MATCH':
      //     return this.matchRider(args[1]);
      // case 'START_RIDE':
      //     return this.startRide(args[1], parseInt(args[2]), args[3]);
      // case 'STOP_RIDE':
      //     return this.stopRide(args[1], parseFloat(args[2]), parseFloat(args[3]), parseInt(args[4]));
      // case 'BILL':
      //     return this.getBill(args[1]);
      default:
        this.addResult("INVALID_COMMAND");
    }
  }

  /**
   *
   * @param {string} name
   * @param {number} x
   * @param {number} y
   * @returns {}
   */
  addRider(name, x, y) {
    if (
      typeof name !== "string" ||
      typeof x !== "number" ||
      typeof y !== "number"
    ) {
      throw new Error("x and y must be numbers, name must be a string");
    }
    RiderManager.registerRider(name, x, y);
  }

  /**
   *
   * @param {string} name
   * @param {number} x
   * @param {number} y
   * @returns {}
   */
  addDriver(name, x, y) {
    if (
      typeof name !== "string" ||
      typeof x !== "number" ||
      typeof y !== "number"
    ) {
      throw new Error("x and y must be numbers, name must be a string");
    }
    DriverManager.registerDriver(name, x, y);
  }

  /**
   *
   * @param {string} result
   */
  addResult(result) {
    this.result += result + "\n";
  }

  /**
   *
   * @returns {string} cummulative result of commands
   */
  getResult() {
    return this.result;
  }
}

let commandManager = new CommandManager();

module.exports = commandManager;
