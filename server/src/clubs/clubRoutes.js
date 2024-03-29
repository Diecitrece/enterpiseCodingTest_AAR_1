'use strict';

var clubController = require('./clubController');

module.exports = function (app) {
  app.route('/clubs').get(clubController.list);
  app.route('/club/:id').get(clubController.getOne);
};
