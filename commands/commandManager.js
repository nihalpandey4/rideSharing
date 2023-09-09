const DriverManager = require("../entities/driverManager");
const rideManager = require("../entities/rideManager");
const RideMatching = require("../entities/rideMatching");
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
      case "MATCH":
        this.addResult(this.matchRider(args[1]));
        break;
      case "START_RIDE":
        this.addResult(this.startRide(args[1], parseInt(args[2]), args[3]));
        break;
      case "STOP_RIDE":
        this.addResult(
          this.stopRide(
            args[1],
            parseFloat(args[2]),
            parseFloat(args[3]),
            parseInt(args[4])
          )
        );
        break;
      case "BILL":
        this.addResult(this.getBill(args[1]));
        break;
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
   * @param {string} riderName
   * @returns {string} driver names joined with " "
   */
  matchRider(riderName) {
    if (typeof riderName !== "string")
      throw new Error("riderName must be a string");

    const matchResult = RideMatching.match(riderName);
    return "DRIVERS_MATCHED " + matchResult.join(" ");
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
    const fs = require("fs");
    fs.writeFileSync("sample_output/output.txt", this.result, "utf-8");
    return this.result;
  }

  /**
   *
   * @param {string} rideId
   * @param {number} positionOfDriver
   * @param {string} riderName
   */
  startRide(rideId, positionOfDriver, riderName) {
    try {
      if (
        typeof rideId !== "string" ||
        typeof +positionOfDriver !== "number" ||
        typeof riderName !== "string"
      )
        throw new Error(
          "param datatype mismatch : rideId:String, positionOfDriver : number, riderName : string"
        );

      return rideManager.startRide(rideId, positionOfDriver, riderName);
    } catch (err) {
      return err.message;
    }
  }

  /**
   *
   * @param {string} rideId
   * @param {number} destinationX
   * @param {number} destinationY
   * @param {number} timeTaken
   */
  stopRide(rideId, destinationX, destinationY, timeTaken) {
    try {
      if (
        typeof rideId !== "string" ||
        typeof destinationX !== "number" ||
        typeof destinationY !== "number" ||
        typeof timeTaken !== "number"
      )
        throw new Error(
          "param datatype mismatch : rideId:String, destinationX : number, destinationY : number, timeTaken:number"
        );
      return rideManager.stopRide(
        rideId,
        destinationX,
        destinationY,
        timeTaken
      );
    } catch (err) {
      return err.message;
    }
  }

  /**
   *
   * @param {string} rideId
   * @returns {number}
   */
  getBill(rideId) {
    try {
      return "BILL " + rideManager.getBill(rideId);
    } catch (err) {
      return err.message;
    }
  }
}

let commandManager = new CommandManager();

module.exports = commandManager;
