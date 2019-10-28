const express = require('express');
const router = new express.Router();
//variables que enrrutan a las consultas
const varLogin = require('../controllers/login.js');
const varRecuperar = require('../controllers/recuperar');
const varUsser = require('../controllers/usser');
const varEntidades = require('../controllers/entidades');
const varTrabajadorEntidad = require('../controllers/trabajador_entidad');
const varSucursales= require('../controllers/sucursales');


router.route('/login')
    .get(varLogin.get);


router.route('/recuperar')
    .get(varRecuperar.get);


router.route('/usser')
    .post(varUsser.post)
    .get(varUsser.get);


router.route('/entidades')
    .get(varEntidades.get)
    .post(varEntidades.post);


router.route('/trabajadorentidades')
    .get(varTrabajadorEntidad.get);
    //.post(varTrabajadorEntidad.post);

router.route('/sucursales')
    .get(varSucursales.get)
    .post(varSucursales.post);
   




module.exports = router;
