const driverManager = require("./driverManager");
const riderManager = require("./riderManager");
const Location = require("./location");

class Ride {
  constructor(riderName, driverName) {
    // checking availability
    if (!riderManager.getRiderAvailability(riderName))
      throw new Error("INVALID_RIDE");
    if (!driverManager.getDriverAvailability(driverName))
      throw new Error("INVALID_RIDE");

    this.riderName = riderName;
    this.driverName = driverName;
    this.startLocation = riderManager.getRiderLocation(riderName);
    this.endLocation = null;
    this.distance = null;
    this.totalTime = null;
    riderManager.updateRiderAvailability(false);
    driverManager.updateDriverAvailability(false);
    this.finished = false;
  }

  /**
   * stops the ride
   * @param {number} destination_x
   * @param {number} destination_y
   * @param {number} totalTime
   */
  stopRide(destination_x, destination_y, totalTime) {
    this.endLocation = new Location(destination_x, destination_y);
    this.distance = this.startLocation.getDistance(this.endLocation);
    this.totalTime = totalTime;
    this.finished = true;
    // const billCalculator = new BillCalculator();
    // this.bill = billCalculator.calculate(this.distance, this.totalTime);
  }

  /**
   *
   * @returns {number} total time in minutes
   */
  getTime() {
    return this.totalTime;
  }

  /**
   *
   * @returns {number} total distance in kms
   */
  getDistance() {
    return this.distance;
  }

  /**
   *
   * @returns {boolean} finish status of ride
   */
  isFinished() {
    return this.finished;
  }
}

module.exports = Ride;
