'use strict';

var mongoose = require('mongoose');
var Club = mongoose.model('Club');

module.exports.list = function(req, res) {
    Club.find()
        .then(c => res.jsonp(c))
        .catch(error => res.status(500).send({message: error}));;
}