let Orders = require('../models/orders');
let Bikes = require('../models/bikes');
let Users = require('../models/users');

let create = function (order, callback) {
    Orders.create(order, function (err, result) {
        if (err || !order) {
            console.error("Could not create order", order);
            console.log('err', err);
            return;
        }
        callback(null, result);
    });
	
	/*Bikes.create(order, function (err, result) {
        if (err || !order) {
            console.error("Could not create order", order);
            console.log('err', err);
            return;
        }
        callback(null, result);
    });*/

   /* Racks.create(order, function (err, result) {
        if (err || !order) {
            console.error("Could not create racks", order);
            console.log('err', err);
            return;
        }
        callback(null, result);
    });

    Users.create(order, function (err, result) {
        if (err || !order) {
            console.error("Could not create users", order);
            console.log('err', err);
            return;
        }
        callback(null, result);
    });*/
};

module.exports = create;
