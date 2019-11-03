//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_proyecto "id_proyecto",
    proyecto "proyecto", 
    id_estado "id_estado",
    estado "estado"
    from proyectos natural join estadoproyecto
  `;


async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = baseQuery;
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

module.exports.find = find;


const selectSucursal=
  `select
    proyecto "proyecto", 
    id_estado "id_estado"
    from proyectos
  `;

async function getNameProyecto(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = selectSucursal;
  const binds = {};


  if (context.id_proyecto) {

    
    binds.id_proyecto = Number(context.id_proyecto);
    query += `\nwhere id_proyecto = :id_proyecto`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.getNameProyecto = getNameProyecto;
//////////////////////////////////////////////////////////////////////
const createProyecto =
  `insert into proyectos (
    proyecto,
    id_sucursal,
    id_estado,
    fecha_inicio
  ) values (
    :proyecto,
    :id_sucursal,
    :id_estado,
    CURRENT_TIMESTAMP
  )`;

async function create(uss) {

  

  const proyecto = Object.assign({}, uss);


  
  let result=await database.simpleExecute(createProyecto, proyecto);

  
  return result.rowsAffected;
}

module.exports.create = create;
