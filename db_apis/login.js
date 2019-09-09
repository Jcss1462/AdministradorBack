//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery =
  `select id_usuario "id_usuario",
    nombre "nombre",
    username "username",
    id_tipo "id_tipo"
  from usuario`;



async function find(context) {
  //console.log(488888);
  let query = baseQuery;
  const binds = {};


  if (context.username&&context.password) {
    //coloco el id del contexto en el bind
    binds.username = context.username;
    binds.password = context.password;

    query += `\nwhere username = :username and contraseña = :password`;

  }




  console.log(query);

  /////////////////////////////////////////////////////


  //////////////////////////////////restriccines de paginacion


  if (context.skip) {
    binds.row_offset = context.skip;

    query += '\noffset :row_offset rows';
  }

  const limit = (context.limit > 0) ? context.limit : 30;

  binds.row_limit = limit;

  query += '\nfetch next :row_limit rows only';

  //////////////////////////////////////////////////////////////////

  let result = await database.simpleExecute(query, binds);


  //añado la imagen a la consulta
  console.log(result);
  return result.rows;
}

module.exports.find = find;


