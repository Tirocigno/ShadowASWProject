let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = mongoose.Schema({
    username: String,
    password: String
});

let Users = mongoose.model('User', userSchema, 'login');

module.exports = Users;
