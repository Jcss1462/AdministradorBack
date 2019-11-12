//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_gasto "id_gasto",
    entidad "entidad", 
    presupuesto_gasto "presupuesto_gasto",
    TO_CHAR(fecha_presupuesto_gasto, 'DD.MM.YYYY') "fecha_presupuesto_gasto",
    estadogasto "estadogasto",
    pago "pago",
    fecha_pago "fecha_pago",
    tipocorte "tipocorte",
    cuotas "cuotas"
    from estadogasto natural join gastos natural join tipocorte
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
const createGasto =
  `insert into gastos (
    entidad,
    presupuesto_gasto,
    fecha_presupuesto_gasto,
    id_estadogasto,
    id_tipocorte,
    id_fases,
    cuotas
  ) values (
    :entidad,
    :presupuesto_gasto,
    :fecha_presupuesto_gasto,
    :id_estadogasto,
    :id_tipocorte,
    :id_fases,
    :cuotas
  )`;

async function create(uss) {

  console.log(uss);
  
  const gasto = Object.assign({}, uss);

  let result=await database.simpleExecute(createGasto, gasto);
  
  return result.rowsAffected;
}

module.exports.create = create;

////////////////////////////////////////////////////////////////////////

const deleteSql =
 `begin

    delete from ingresos
    where id_ingreso = :id_ingreso;

    :rowcount := sql%rowcount;

  end;`

async function del(id) {
  const binds = {
    id_ingreso: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  console.log(1);
  console.log(result.outBinds.rowcount === 1);
  console.log(1);


  return result.outBinds.rowcount === 1;;
}

module.exports.del = del;