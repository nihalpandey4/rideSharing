class Location {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error("x and y must be numbers");
        }
        this.x = x;
        this.y = y;
    }

    /**
     * 
     * @param {Location} location2 
     * @returns {number} distance between two location coordinates
     */
    getDistance(location2) {
        if (!(location2 instanceof Location)) {
            throw new Error("location2 must be of type Location");
        }

        let dx = this.x - location2.getX();
        let dy = this.y - location2.getY();
        let distance = Math.sqrt((dx * dx) + (dy * dy));
        return distance.toFixed(2);
    }

    /**
     * 
     * @returns {number} x coordinate of location
     */
    getX() {
        return this.x;
    }

    /**
     * 
     * @returns {number} y coordinate of location
     */
    getY() {
        return this.y;
    }
}

module.exports = Location;