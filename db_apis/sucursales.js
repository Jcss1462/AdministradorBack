//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_sucursal "id_sucursal",
    sucursal "sucursal", 
    direccion "direccion"
    from sucursales
  `;


async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = baseQuery;
  const binds = {};


  if (context.id_entidad) {

    
    binds.id_entidad = Number(context.id_entidad);
    query += `\nwhere id_entidad = :id_entidad`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;

//////////////////////////////////////////////////////////////////////
const createEntidad =
  `insert into sucursales (
    sucursal,
    direccion,
    id_entidad
  ) values (
    :sucursal,
    :direccion,
    :id_entidad
  )`;

async function create(uss) {

  

  const sucursal = Object.assign({}, uss);


  
  let result=await database.simpleExecute(createEntidad, sucursal);

  
  return result.rowsAffected;
}

module.exports.create = create;
