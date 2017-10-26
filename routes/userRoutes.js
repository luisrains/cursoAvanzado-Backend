'use strict'

var express = require('express');
var userController = require('../controllers/userController');

var api = express.Router();

api.get('/pruebas-del-controller', userController.pruebas);

module.exports = api;