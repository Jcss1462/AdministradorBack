const express = require('express');
const router = new express.Router();
//variables que enrrutan a las consultas
const varLogin = require('../controllers/login.js');
const varRecuperar = require('../controllers/recuperar');



router.route('/login')
    .get(varLogin.get);
    

router.route('/recuperar')
    .get(varRecuperar.get);


module.exports = router;
