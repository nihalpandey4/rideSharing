const driverManager = require("./driverManager");
const riderManager = require("./riderManager");
const Location = require("./location");
const BillCalculator = require("./billCalculator");

class Ride {
  constructor(
    riderName,
    driverName,
    baseFare,
    perKmCharge,
    perMinuteCharge,
    serviceTaxPercentage
  ) {
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
    riderManager.updateRiderAvailability(riderName, false);
    driverManager.updateDriverAvailability(driverName, false);
    this.finished = false;

    this.bill = null;

    this.billCalculator = new BillCalculator(
      baseFare,
      perKmCharge,
      perMinuteCharge,
      serviceTaxPercentage
    );
  }

  /**
   * stops the ride
   * @param {Location} destination_y
   * @param {number} totalTime
   */
  stopRide(destinationLocation, totalTime) {
    this.endLocation = destinationLocation;
    this.distance = this.startLocation.getDistance(this.endLocation);
    this.totalTime = totalTime;
    this.finished = true;
    this.bill = this.billCalculator.calculate(this.distance, this.totalTime);
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

  /**
   *
   * @returns {number} bill
   */
  getBill() {
    if (this.isFinished) return this.bill;
    else throw new Error("RIDE_NOT_COMPLETED");
  }

  /**
   *
   * @returns {string} driver name
   */
  getDriver() {
    return this.driverName;
  }
}

module.exports = Ride;
