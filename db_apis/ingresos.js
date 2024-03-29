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
/////////////////////////////////////////////////////////////////////

const updateSql =
 `update ingresos
    set id_estadoingreso = :id_estadoingreso,
    ingreso = :ingreso,
    interes = :interes,
    fecha_ingreso = :fecha_ingreso,
    cuotas =:cuotas
  where id_ingreso = :id_ingreso`;
 
async function update(emp) {
  const ingreso = Object.assign({}, emp);

  console.log(ingreso);
  const result = await database.simpleExecute(updateSql, ingreso);
 
  if (result.rowsAffected && result.rowsAffected === 1) {
    return ingreso;
  } else {
    return null;
  }
}
 
module.exports.update = update;



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

////////////////////////////////////////////////////////////////////////

const deleteSql = `BEGIN :val := eliminarIngreso(:id); END;`;

async function del(id) {
  
  const binds = {};
  binds.id = Number(id);
  binds.val = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 500000 };

  const result = await database.simpleExecute(deleteSql, binds);

  
  return result.outBinds;
}

module.exports.del = del;