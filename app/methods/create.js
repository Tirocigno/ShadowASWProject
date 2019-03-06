
//Definisce il modulo orders e lo importa
let Orders = require('../models/orders');

/**
 * Funzione che permette di creare un nuovo ordine usando il modulo order, prende in ingresso un oggetto ordine
 * e una CallBack da usare a termine del processo di creazione dell'ordine.*/
let create = function (order, callback) {
    Orders.create(order, function (err, result) {
        if (err || !order) {
            console.error("Could not create order", order);
            console.log('err', err);
            return;
        }
        callback(null, result);
    });
};

/**L'export di questo modulo espone la variabile create, ovvero una funzione*/
module.exports = create;
