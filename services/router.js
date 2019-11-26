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
const varGastos= require('../controllers/gastos');
const varSubGastos= require('../controllers/subgastos');
const varClienteSucursales= require('../controllers/cliente-sucursal');
const varListaInversiones= require('../controllers/lista-inversiones');



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

router.route('/gastos')
    .get(varGastos.get)
    .put(varGastos.put)
    .delete(varGastos.del)
    .post(varGastos.post);
   
router.route('/subgastos')
    .get(varSubGastos.get)
    .put(varSubGastos.put);

router.route('/clientesucursales')
    .get(varClienteSucursales.get)
    .post(varClienteSucursales.post);

router.route('/listaInversiones')
    .get(varListaInversiones.get)
    .post(varListaInversiones.post);


module.exports = router;
