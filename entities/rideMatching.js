const driverManager = require("./driverManager");
const riderManager = require("./riderManager");

//behaviour class
class RideMatching {
  constructor(radius = 5) {
    if (typeof radius !== "number") throw new Error("radius must be a number");
    this.radius = radius;
  }

  /**
   *
   * @param {String} riderName
   * @returns {[String]} driverNames sorted based on distance within range defined
   */
  match(riderName) {
    let rider = riderManager.getRider(riderName);
    // filtering drivers within defined range
    let inRangeDrivers = [];
    driverManager.getAllDriverNames().forEach((driverName) => {
      let distance = rider
        .getLocation()
        .getDistance(driverManager.getDriver(driverName).getLocation());
      if (distance <= this.radius)
        inRangeDrivers.push({ driverName, distance });
    });

    //sorting on the basis of distance and lexographical order
    inRangeDrivers = inRangeDrivers.sort((a, b) => {
      if (a.distance - b.distance == 0) return a.driverName - b.driverName;
      return a.distance - b.distance;
    });
    let driverNames = inRangeDrivers.map((element) => element.driverName);
    return driverNames;
  }
}

module.exports = new RideMatching();
