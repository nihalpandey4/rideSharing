const Rider = require("./rider");

class RiderManager {
  constructor() {
    this.directory = new Map();
  }

  /**
   * creates a rider against a unique name
   * @param {String} name
   * @param {Number} x
   * @param {Number} y
   */
  registerRider(name, x, y) {
    if (
      typeof name !== "string" ||
      typeof x !== "number" ||
      typeof y !== "number"
    ) {
      throw new Error("x and y must be numbers, name must be a string");
    }

    name = name.trim();

    if (this.directory.has(name)) throw new Error("Rider already exists");

    let rider = new Rider(name, x, y);
    this.directory.set(name, rider);
  }

  /**
   * return rider against the given name
   * @param {String} name
   * @returns {Rider}
   */
  getRider(name) {
    if (typeof name !== "string") throw new Error("name must be a string");
    name = name.trim();
    if (this.directory.has(name)) return this.directory.get(name);
    else throw new Error("rider not found");
  }
}

const riderManager = new RiderManager();

module.exports = riderManager;
