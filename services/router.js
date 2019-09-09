const express = require('express');
const router = new express.Router();
//llamo a artista.js
const varLogin = require('../controllers/login.js');



router.route('/login')
    .get(varLogin.get);




module.exports = router;
