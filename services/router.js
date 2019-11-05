const express = require('express');
const router = new express.Router();
//variables que enrrutan a las consultas
const varLogin = require('../controllers/login.js');
const varRecuperar = require('../controllers/recuperar');
const varUsser = require('../controllers/usser');
const varEntidades = require('../controllers/entidades');
const varTrabajadorEntidad = require('../controllers/trabajador_entidad');
const varSucursales= require('../controllers/sucursales');
const varProyectos= require('../controllers/proyectos');
const varFases= require('../controllers/fases');
const varIngresos= require('../controllers/ingresos');


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

router.route('/proyectos')
    .get(varProyectos.get)
    .post(varProyectos.post);
   
router.route('/fases')
    .get(varFases.get)
    .post(varFases.post);

router.route('/ingresos')
    .get(varIngresos.get)
    .put(varIngresos.put)
    .delete(varIngresos.del)
    .post(varIngresos.post);
   



module.exports = router;
