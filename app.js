'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
//cargar rutas
//cargamos o ue esta en la carpeta routes, y userRoute
var user_routes = require('./routes/userRoutes');

//configurarlos middelwares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras y cors

//configuracioes de rutas bases
// /api para un prefijo de la url que esta en userRoute
app.use('/api',user_routes);



app.get('/probando', (req, res)=>{
	res.status(200).send({message: 'Este metodo se esta probando'});
})
module.exports = app;