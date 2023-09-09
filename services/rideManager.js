const driverManager = require("./driverManager");
const Ride = require("../models/ride");
const rideMatching = require("./rideMatching");
const riderManager = require("./riderManager");
const Location = require("../models/location");

class RideManager {
  constructor() {
    this.rideDirectory = new Map();
    this.billDirectory = new Map();
  }

  /**
   *
   * @param {string} rideId
   * @param {number} positionOfDriver
   * @param {string} riderName
   * @returns {string} status of ride
   */
  startRide(rideId, positionOfDriver, riderName) {
    if (typeof rideId !== "string") throw new Error("rideId must be a string");

    if (typeof positionOfDriver !== "number")
      throw new Error("positionOfDriver must be a number");

    if (typeof riderName !== "string")
      throw new Error("riderName must be a string");

    if (this.rideDirectory.has(rideId)) throw new Error("INVALID_RIDE");
    if (!riderManager.getRiderAvailability(riderName))
      throw new Error("INVALID_RIDE");

    let drivers = rideMatching.match(riderName);

    let selectedDriver = drivers[positionOfDriver - 1];

    if (!selectedDriver) throw new Error("INVALID_RIDE");

    if (!driverManager.getDriverAvailability(selectedDriver))
      throw new Error("INVALID_RIDE");

    const ride = new Ride(riderName, selectedDriver);
    this.rideDirectory.set(rideId, ride);
    return "RIDE_STARTED " + rideId;
  }

  /**
   *
   * @param {string} rideId
   * @param {number} destinationX
   * @param {number} destinationY
   * @param {number} timeTaken
   * @returns {string} status of ride
   */
  stopRide(rideId, destinationX, destinationY, timeTaken) {
    if (typeof rideId !== "string") throw new Error("rideId must be a string");

    if (typeof destinationX !== "number")
      throw new Error("destinationX must be a number");

    if (typeof destinationY !== "number")
      throw new Error("destinationY must be a number");

    if (typeof timeTaken !== "number")
      throw new Error("timeTaken must be a number");

    if (!this.rideDirectory.has(rideId)) throw new Error("INVALID_RIDE");

    if (this.rideDirectory.has(rideId)) {
      const ride = this.getRide(rideId);
      if (ride.isFinished()) throw new Error("INVALID_RIDE");
      ride.stopRide(new Location(destinationX, destinationY), timeTaken);
      return "RIDE_STOPPED " + rideId;
    } else {
      throw new Error("INVALID_RIDE");
    }
  }

  /**
   *
   * @param {string} rideId
   * @returns {Ride} return specified ride
   */
  getRide(rideId) {
    if (typeof rideId !== "string") throw new Error("rideId must be a string");

    if (this.rideDirectory.has(rideId)) return this.rideDirectory.get(rideId);
    else throw new Error("Ride not found");
  }

  /**
   *
   * @param {string} rideId
   * @returns {number} bill
   */
  getBill(rideId) {
    try {
      if (typeof rideId !== "string")
        throw new Error("rideId must be a string");
      const ride = this.getRide(rideId);
      if (ride) {
        return `${rideId} ${ride.getDriver()} ${ride.getBill()}`;
      } else throw new Error("INVALID_RIDE");
    } catch (err) {
      return "INVALID_RIDE";
    }
  }
}

module.exports = new RideManager();
