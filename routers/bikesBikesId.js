var express = require('express');
var app = express();
var Bikes = require('../app/models/bikes');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.patch('/bikes/:bikeId', jsonParser, function(req, res) {
    Bikes.findOneAndUpdate(req.params.bikeId, {delivered: true}, function(err, order) {
        if (err) {
            console.log(err);
        } else {
            res.json(order);
            res.status(200);
        }
    })
})

module.exports = app;
