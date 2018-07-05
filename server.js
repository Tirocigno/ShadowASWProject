let http = require('http');
let express = require('express');
let app = express();
let MongoClient = require('mongodb').MongoClient;
let mongoose = require('mongoose');
let getPrevsAndFavs = require('./routers/getPrevsAndFavs');
let orders = require('./routers/orders');
let bikes = require('./routers/bikes');
let ordersOrdersId = require('./routers/ordersOrdersId');
let bikesBikesId = require('./routers/bikesBikesId');
let users = require('./routers/users');


/* ------------------Mongoose--------------------- */

let MongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://Ali:alibaba1@ds117061.mlab.com:17061/alibaba';
mongoose.Promise = global.Promise;
mongoose.connect(MongoURI, {useMongoClient: true});

mongoose.connection.once('open', function () {
    console.log('connection established!');
});

mongoose.connection.on('error', function (err) {
    console.error('Could not connect.  Error:', err);
});


/* -----------------Express------------------------ */

function customerRequestHandler(request, response) {
    response.sendFile(__dirname + '/public/customer.html');
}

function BARequestHandler(request, response) {
    response.sendFile(__dirname + '/public/business-admin.html');
}

app.use(express.static(__dirname + '/public'));

app.use('/api', getPrevsAndFavs);
app.use('/api', orders);
app.use('/api', bikes);
app.use('/api', ordersOrdersId);
app.use('/api', bikesBikesId);

app.get('/admin', BARequestHandler);
app.get('/', customerRequestHandler);
app.get('/*', (req, res) => {
    res.redirect('/');
});

let log = function () {
    console.log('app listening on port 4005');
};

app.listen(process.env.PORT || 4005, log);

module.exports = app;