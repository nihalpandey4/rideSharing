const Driver = require("./driver");

class DriverManager {
  constructor() {
    this.directory = new Map();
    this.driverNames = [];
  }

  /**
   * creates a rider against a unique name
   * @param {String} name
   * @param {Number} x
   * @param {Number} y
   */
  registerDriver(name, x, y) {
    if (
      typeof name !== "string" ||
      typeof x !== "number" ||
      typeof y !== "number"
    ) {
      throw new Error("x and y must be numbers, name must be a string");
    }
    name = name.trim();

    if (this.directory.has(name)) throw new Error("Driver already exists");

    let driver = new Driver(name, x, y);
    this.directory.set(name, driver);
    this.driverNames.push(name);
  }

  /**
   * return driver against the given name
   * @param {String} name
   * @returns {Rider}
   */
  getDriver(name) {
    if (typeof name !== "string") throw new Error("name must be a string");
    name = name.trim();
    if (this.directory.has(name)) return this.directory.get(name);
    else throw new Error("driver not found");
  }

  /**
   *
   * @returns {[String]} array of drivernames
   */
  getAllDriverNames() {
    return this.driverNames;
  }
}

const driverManager = new DriverManager();

module.exports = driverManager;
