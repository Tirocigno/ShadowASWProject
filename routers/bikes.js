let express = require('express');
let app = express();
let Bikes = require('../app/models/bikes');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let create = require('../app/methods/create');
let read = require('../app/methods/read');

app.get('/bikes', jsonParser, function (req, res) {
    read({}, function (err, listOfOrders) {
        if (err) {
            res.json(err)
        }
        res.json(listOfOrders);
        res.status(200);
    })
});

app.post('/bikes', jsonParser, function (req, res) {
    create(req.body, function (err, order) {
        res.json(order);
        res.status(201);
    });
});

app.delete('/bikes', jsonParser, function (req, res) {
    Bikes.remove({}, function (err) {
        res.json('collection removed')
        res.status(200);
    });
});

// app.patch('/bikes', jsonParser, function(req, res) {
//     Orders.find({}, function (err, listOfOrders) {
//         if (err) {
//             console.log(err);
//         }
//
//         console.log(listOfOrders);
//         listOfOrders.forEach(function(order) {
//             order.completed = false;
//         });
//         listOfOrders.save(function(err, result) {
//             if (err) {
//                 console.log(err);
//             }
//
//             res.status(200);
//             res.json('all bikes marked incomplete')
//         })
//
//     });
// })

module.exports = app;
