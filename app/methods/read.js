let Orders = require('../models/orders');

/**Legge un insieme di ordini e esegue una callback
 * filter: una funzione di filtro
 * callback: l'operazione da eseguire sul set di ordini filtrato*/
let read = function (filter, callback) {
    Orders.find(filter, function (err, listOfOrders) { // needs to be able to find all values in an array
        if (!listOfOrders || err) {
            console.error("Could not read snippet");
            return;
        }
        callback(null, listOfOrders);
    });
};

module.exports = read;
