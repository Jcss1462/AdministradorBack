//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    username "username"
    from usuario`;


async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  if (context.email) {


    console.log("Comenzando verificacion de existencia del correo");

    let query;
    const binds = {};
    binds.username = context.email;

    console.log("¿problemas?");

    query = baseQuery + `\nwhere username = :username`;

    console.log("query= " + query);

    let result = await database.simpleExecute(query, binds);


    //enviar correo
    //window.open('mailto:jcss1462@gmail.com?subject=subject&body=body');

    console.log('Extraccion de datos finalizada');
    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;



