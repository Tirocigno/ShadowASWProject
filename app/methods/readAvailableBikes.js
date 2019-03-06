let Bikes = require('../models/bikes');

/**Credo faccia praticamente la stessa cosa di sopra ma usando la funzione find per le bici*/
let read = function (filter, callback) {
    Bikes.find(filter, function (err, listOfBikes) {
        if (!listOfBikes || err) {
            console.error("Could not read snippet");
            return;
        }
        callback(null, listOfBikes);
    });
};

module.exports = read;
