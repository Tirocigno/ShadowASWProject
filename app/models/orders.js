let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderSchema = mongoose.Schema({
    username: String,
	selectedShop: String,
    selectedShop_id: String,
	selectedBike: String,
	date: String,
    time: String,
    orderCompleted: Boolean,
	items: Array
});

let Orders = mongoose.model('Order', orderSchema, 'orders');

module.exports = Orders;
