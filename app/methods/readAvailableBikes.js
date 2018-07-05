let Bikes = require('../models/bikes');

let read = function (filter, callback) {
    Bikes.find(filter, function (err, listOfBikes) { // needs to be able to find all values in an array
        if (!listOfBikes || err) {
            console.error("Could not read snippet");
            return;
        }
        callback(null, listOfBikes);
    });
};

module.exports = read;
