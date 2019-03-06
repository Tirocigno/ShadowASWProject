
// Importa mongoose
var mongoose = require('mongoose');

/**Dichiara in una variabile lo schema del database da utilizzare*/
var orderSchema = mongoose.Schema({
    rackId: String,
	bikeId: String,
	delivered: Boolean
});

/**Dichiara e esporta un modello costruito sullo schema di prima e lo espone*/
var Bikes = mongoose.model('Bikes', orderSchema);

module.exports = Bikes;