let express = require('express');
let app = express();
let Users = require('../app/models/users');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let create = require('../app/methods/create');
let read = require('../app/methods/read');

app.post('/orders', jsonParser, function (req, res) {
    create(req.body, function (err, order) {
        res.json(order);
        res.status(201);
    });
});

app.delete('/orders', jsonParser, function (req, res) {
    Users.remove({}, function (err) {
        res.json('collection removed');
        res.status(200);
    });
});

app.patch('/orders', jsonParser, function(req, res) {
     Users.find({}, function (err, listOfOrders) {
         if (err) {
             console.log(err);
         }

         console.log(listOfOrders);
         listOfOrders.forEach(function(order) {
             order.completed = false;
         });
         listOfOrders.save(function(err, result) {
             if (err) {
                 console.log(err);
             }

             res.status(200);
             res.json('all orders marked incomplete')
         })

     });
 });

module.exports = app;
