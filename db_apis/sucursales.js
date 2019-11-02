//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_sucursal "id_sucursal",
    sucursal "sucursal", 
    direccion "direccion",
    cantidad "cantidad"
    from sucursales natural join
    proyectos_activos
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


const selectSucursal=
  `select
    id_sucursal "id_sucursal", 
    sucursal "sucursal",
    direccion "direccion"
    from sucursales
  `;

async function getNameSucursal(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = selectSucursal;
  const binds = {};


  if (context.id_sucursal) {

    
    binds.id_sucursal = Number(context.id_sucursal);
    query += `\nwhere id_sucursal = :id_sucursal`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.getNameSucursal = getNameSucursal;
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
