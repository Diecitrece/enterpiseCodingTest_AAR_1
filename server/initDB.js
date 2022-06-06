'use strict';

// it is called when starting

var mongoose = require('mongoose');
var Club = mongoose.model('Club');

module.exports.init = async function() {
    var nClubs = await Club.countDocuments();
    
    if (nClubs === 0) {
        createDefaultClubs();
    }
}

async function createDefaultClubs() {
    for(var i=1; i<=100; i++) {
        var club = new Club();
        club.name = "Club " + i;
        club.image = "https://source.unsplash.com/random/400x600?sig="+i;
        await club.save();
    }
    console.log("Create default clubs");
}