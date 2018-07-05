let Orders = require('../models/orders');
let Bikes = require('../models/bikes');
let Users = require('../models/users');

let read = function (filter, callback) {
    Orders.find(filter, function (err, listOfOrders) { // needs to be able to find all values in an array
        if (!listOfOrders || err) {
            console.error("Could not read snippet");
            return;
        }
        callback(null, listOfOrders);
    });
	
	 /*Bikes.find(filter, function (err, listOfOrders) { // needs to be able to find all values in an array
        if (!listOfOrders || err) {
            console.error("Could not read snippet");
            return;
        }
        callback(null, listOfOrders);
    });

    // Racks.find(filter, function (err, listOfOrders) { // needs to be able to find all values in an array
    //     if (!listOfOrders || err) {
    //         console.error("Could not read snippet");
    //         return;
    //     }
    //     callback(null, listOfOrders);
    // });

   Users.find(filter, function (err, listOfOrders) { // needs to be able to find all values in an array
        if (!listOfOrders || err) {
            console.error("Could not read snippet");
            return;
        }
        callback(null, listOfOrders);
    });*/
};

module.exports = read;
