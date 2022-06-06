'use strict';

var userController = require('./userController');

module.exports = function(app) {

    app.route('/users/authenticate')
        .post(userController.authenticate);

    app.route('/users/register')
        .post(userController.register);
}