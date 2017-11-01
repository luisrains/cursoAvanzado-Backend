'use strict'

var express = require('express');
var animalsController = require('../controllers/animalsController');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/animals'});

api.get('/pruebas-animales', md_auth.ensureAuth, animalsController.pruebas);
api.post('/animal', md_auth.ensureAuth, animalsController.saveAnimal);
api.get('/animales',animalsController.getAnimals);
api.get('/animal/:id',animalsController.getAnimal);
api.put('/animal-update/:id',md_auth.ensureAuth, animalsController.updateAnimal);

module.exports = api;
