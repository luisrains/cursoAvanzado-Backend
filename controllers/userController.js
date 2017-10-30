'use strict'
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');

//service
var jwt = require('../service/jwt');
//acciones
function pruebas(req, res){
	res.status(200).send({
			message: 'Probando el controlador de usuarios',
			usuario: req.user
	});
}

function saveUser(req, res){
	var newUser = new User();
	var params = req.body;
	console.log('ingreso');

	if(params.password){
		newUser.name = params.name;
		newUser.surname = params.email;
		newUser.email = params.email;
		newUser.role = 'ROLE_USER';
		newUser.image = null;

		User.findOne({email:newUser.email.toLowerCase()}, (err, userf)=>{
			if(err){
				res.status(500).send({message: "Error al comprobar el usuario"});
			}else{
				if(!userf){
					bcrypt.hash(params.password, null, null, function (err, hash){
						newUser.password = hash;
						//el metodo save es de mongoose
						newUser.save((err, userStored)=> {
							if(err){
								res.status(500).send({message: "Error al guardar el usuario"});
							}else{
								if(!userStored){
									res.status(404).send({message: "No se ha registrado el usuario"});	
								}else{
									res.status(200).send({user: userStored});
								}
							}
						});
					});
				}else{
					res.status(500).send({message: "El usuario no puede registrarse, ya existe"});
				}
			}
		});

		
	}else{
		res.status(200).send({message: "Introduzca los datos correctamente"});
	}
}

function login(req, res){
	var params = req.body;
	var email = params.email;
	var password = params.password;
	
	User.findOne({email:email.toLowerCase()}, (err, userf)=>{

		if(err){
			res.status(500).send({message: "Error al comprobar el usuario"});
		}else{
			if(userf){

				bcrypt.compare(password,userf.password, (error,check)=>{
					if(check){
						if(params.gettoken){
							res.status(200).send({
								token: jwt.createToken(userf)
							});
						}else{
							res.status(200).send({userf});
						}
						
					}else{
						res.status(404).send({message: "El usuario no ha podido loguearse correctamente"});
					}
				});
			}else{
				res.status(404).send({message: "El usuario no ha podido loguearse"});
			}
		}

	});

}

function updateUser(req,res){
	var userId = req.params.id;
	var update = req.body;

	if(userId != req.user.sub){
		res.status(500).send({message: "No tienes permisos para actualizar el user"});
	}
	User.findByIdAndUpdate(userId,update,(err, userUpdated)=>{
		if(err){
			res.status(500).send({message: "Error al actualizar usuario"});
		}else{
			if(!userUpdated){
				res.status(404).send({message: "No se ha podido actulizar el usuario"});
			}else{
				res.status(200).send({message: "El usuario se ha actualizado correctamente", usuario: userUpdated});
			}
		}
	});
}

module.exports = {
	pruebas,
	saveUser,
	login,
	updateUser
};