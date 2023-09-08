class BillCalculator {
  /**
   *
   * @param {number} baseFare
   * @param {number} perKmCharge
   * @param {number} perMinuteCharge
   * @param {number} serviceTaxPercentage
   */
  constructor(
    baseFare = 50,
    perKmCharge = 6.5,
    perMinuteCharge = 2,
    serviceTaxPercentage = 20
  ) {
    if (
      typeof baseFare !== "number" ||
      typeof perKmCharge !== "number" ||
      typeof perMinuteCharge !== "number" ||
      typeof serviceTaxPercentage !== "number"
    ) {
      throw new Error("All parameters must be numbers");
    }
    this.baseFare = baseFare;
    this.perKmCharge = perKmCharge;
    this.perMinuteCharge = perMinuteCharge;
    this.serviceTaxPercentage = serviceTaxPercentage;
  }

  /**
   *
   * @param {number} distance
   * @param {number} time
   * @returns {number} totalCost
   */
  calculate(distance, time) {
    return (
      (this.baseFare +
        this.perKmCharge * distance +
        this.perMinuteCharge * time) *
      (1 + this.serviceTaxPercentage / 100)
    ).toFixed(2);
  }
}

module.exports = BillCalculator;
