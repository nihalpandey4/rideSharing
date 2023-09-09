const Location = require("./location");

class Driver {
  /**
   *
   * @param {string} name
   * @param {number} x
   * @param {number} y
   */
  constructor(name, x, y) {
    if (
      typeof name !== "string" ||
      typeof x !== "number" ||
      typeof y !== "number"
    ) {
      throw new Error("x and y must be numbers, name must be a string");
    }
    this.name = name;
    this.location = new Location(+x, +y);
    this.available = true;
  }

  /**
   *
   * @returns {Location} location of driver
   */
  getLocation() {
    return this.location;
  }

  /**
   *
   * @returns {Location} name of driver
   */
  getName() {
    return this.name;
  }

  /**
   * set availability of rider
   * @param {Boolean} isAvailable
   */
  updateAvailablility(isAvailable) {
    this.available = isAvailable;
  }

  /**
   *
   * @returns {Boolean} availability of rider
   */
  getAvailability() {
    return this.available;
  }
}

module.exports = Driver;
