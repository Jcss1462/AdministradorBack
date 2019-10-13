//logica de la base de datos
const database = require('../services/database.js');
//const oracledb = require('oracledb');


const baseQuery =
  `select 
    entidad "entidad",
    count(DISTINCT(id_sucursal)) "cantidad_sucursales"
   from usuario natural join Trabajador_has_Entidad natural join  entidad natural join sucursales
  `;




async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  if (context.id_usuario) {

    let query = baseQuery;
    const binds = {};

    binds.id_usuario = Number(context.id_usuario);
    query += `\nwhere id_usuario = :id_usuario group by entidad`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;

