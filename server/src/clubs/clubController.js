'use strict';

var mongoose = require('mongoose');
var Club = mongoose.model('Club');

module.exports.list = function (req, res) {
  Club.find()
    .then((c) => res.jsonp(c))
    .catch((error) => res.status(500).send({ message: error }));
};
module.exports.getOne = async function (req, res) {
  const idClub = req.params.id;
  let club = await Club.findById(idClub);
  if (!club) res.status(404).send({ message: 'Club not found' });
  res.status(200).jsonp(club);
};
