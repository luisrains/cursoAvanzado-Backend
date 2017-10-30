'use strict'

var express = require('express');
var userController = require('../controllers/userController');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');

api.get('/pruebas-del-controller', md_auth.ensureAuth, userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.login);
api.put('/update-user/:id', md_auth.ensureAuth, userController.updateUser);
module.exports = api;