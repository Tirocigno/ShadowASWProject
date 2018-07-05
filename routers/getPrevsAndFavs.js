let express = require('express');
let app = express();
let read = require('../app/methods/read');
let readBikes = require('../app/methods/readAvailableBikes');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let Orders = require('../app/models/orders');
let Bikes = require('../app/models/bikes');


app.get('/users/:username/orders/previous', function (req, res) {
    read({ username: req.params.username }, function (err, listOfOrders) {
        res.json(listOfOrders);
        res.status(200);
    })
});

app.get('/users/:username/orders/favorites', function (req, res) {
    read({
        favorited: true,
        username: req.params.username
    }, function (err, listOfOrders) {
        res.json(listOfOrders);
        res.status(200);
    })
});

app.get('/users/:username/orders/bikes', function (req, res) {
    read({
        orderCompleted: false,
        username: req.params.username
    }, function (err, listOfOrders) {
        res.json(listOfOrders);
        res.status(200);
    })
});

app.patch('/orders/:username', jsonParser, function(req, res) {
    Orders.findOneAndUpdate({"username":req.params.username, "orderCompleted": false}, {$set: {"orderCompleted": true}}, function(err, order) {
        if (err) {
            console.log(err);
        } else {
            res.json(order);
            res.status(200);
        }
    })
});

app.patch('/bikes/:bikeId', jsonParser, function(req, res) {
    Bikes.findOneAndUpdate({"bikeId":req.params.bikeId }, {$set: {"delivered": false}}, function(err, order) {
        if (err) {
            console.log(err);
        } else {
            res.json(order);
            res.status(200);
        }
    })
});

app.patch('/bikes/:rackId/:bikeId', jsonParser, function(req, res) {
    Bikes.findOneAndUpdate({"bikeId":req.params.bikeId }, {$set: {"rackId":req.params.rackId, "delivered": true}}, function(err, order) {
        if (err) {
            console.log(err);
        } else {
            res.json(order);
            res.status(200);
        }
    })
});

app.get('/bikes/:rackId', function (req, res) {
    readBikes({ rackId: req.params.rackId, delivered: true }, function (err, listOfBikes) {
        res.json(listOfBikes);
        res.status(200);
    })
});

module.exports = app;
