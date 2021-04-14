class pointWithLatLon {
    constructor(jsonData) {
        const {lat,lon}=jsonData;
        this.lat = lat;
        this.lon = lon;
    }
    testWoring() {
        console.log("test");
    }

    getLat() {
        return this.lat;
    }

    getLon() {
        return this.lon;
    }
}