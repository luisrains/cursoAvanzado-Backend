'use strict'

var express = require('express');
var userController = require('../controllers/userController');

var api = express.Router();

api.get('/pruebas-del-controller', userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.login);
module.exports = api;