//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_ingreso "id_ingreso",
    entidad "entidad", 
    presupuesto "presupuesto",
    TO_CHAR(fecha_presupuesto_ingreso, 'DD.MM.YYYY') "fecha_presupuesto_ingreso",
    estadoingreso "estadoingreso",
    tipoingreso "tipoingreso",
    ingreso "ingreso",
    interes "interes",
    TO_CHAR(fecha_ingreso, 'DD.MM.YYYY') "fecha_ingreso"
    from estadoingreso natural join ingresos natural join tipoingreso
  `;


async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = baseQuery;
  const binds = {};


  if (context.id_fase) {

    binds.id_fase = Number(context.id_fase);
    query += `\nwhere id_fases = :id_fase`;

    console.log(query);

    let result = await database.simpleExecute(query, binds);

  
    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;


//////////////////////////////////////////////////////////////////////
const createIngreso =
  `insert into ingresos (
    entidad,
    presupuesto,
    fecha_presupuesto_ingreso,
    id_estadoingreso,
    id_tipoingreso,
    id_fases
  ) values (
    :entidad,
    :presupuesto,
    :fecha_presupuesto_ingreso,
    :id_estadoingreso,
    :id_tipoingreso,
    :id_fase
  )`;

async function create(uss) {

  console.log(uss);
  
  const ingreso = Object.assign({}, uss);

  let result=await database.simpleExecute(createIngreso, ingreso);
  
  return result.rowsAffected;
}

module.exports.create = create;
