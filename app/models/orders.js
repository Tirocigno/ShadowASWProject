
//Definisce schema e modello per gestire gli ordini tramite database

let mongoose = require('mongoose');


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
