'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClubSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
  text: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Club', ClubSchema);
