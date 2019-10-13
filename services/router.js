const express = require('express');
const router = new express.Router();
//variables que enrrutan a las consultas
const varLogin = require('../controllers/login.js');
const varRecuperar = require('../controllers/recuperar');
const varUsser = require('../controllers/usser');
const varTrabajadorEntidad = require('../controllers/trabajador_entidad');


router.route('/login')
    .get(varLogin.get);


router.route('/recuperar')
    .get(varRecuperar.get);


router.route('/usser')
    .post(varUsser.post)
    .get(varUsser.get);


router.route('/trabajadorentidades')
    .get(varTrabajadorEntidad.get);


module.exports = router;
