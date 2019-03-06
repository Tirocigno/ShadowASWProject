
//Definisce schema e modello per gestire gli ordini tramite database MongoDB

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String
});

let Users = mongoose.model('User', userSchema, 'login');

module.exports = Users;
