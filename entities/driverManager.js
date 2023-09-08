const Driver = require("./driver");

class DriverManager {
  constructor() {
    this.directory = new Map();
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

    if(this.directory.has(name))
        throw new Error("Driver already exists");
    
    let driver = new Driver(name,x,y);
    this.directory.set(name) = driver;
  }

  

}


const driverManager = new DriverManager();

module.exports = driverManager;