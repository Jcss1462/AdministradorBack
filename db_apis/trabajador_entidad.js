//logica de la base de datos
const database = require('../services/database.js');
//const oracledb = require('oracledb');


const baseQuery =
  `select
    id_entidad "id_entidad", 
    entidad "entidad",
    cantidad "cantidad_sucursales"
   from TRABAJADOR_HAS_ENTIDAD natural join entidad_canitidad_sucursales
  `;




async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  if (context.id_usuario) {

    let query = baseQuery;
    const binds = {};

    binds.id_usuario = Number(context.id_usuario);
    query += `\nwhere TRABAJADOR_HAS_ENTIDAD.ID_USUARIO = :id_usuario`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;

