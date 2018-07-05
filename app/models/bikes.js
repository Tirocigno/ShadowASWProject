var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = mongoose.Schema({
    rackId: String,
	bikeId: String,
	delivered: Boolean
});

var Bikes = mongoose.model('Bikes', orderSchema);

module.exports = Bikes;