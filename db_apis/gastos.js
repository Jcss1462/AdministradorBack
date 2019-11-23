//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_gasto "id_gasto",
    entidad "entidad", 
    presupuesto_gasto "presupuesto_gasto",
    pago_pactado"pago_pactado",
    TO_CHAR(fecha_presupuesto_gasto, 'DD.MM.YYYY') "fecha_presupuesto_gasto",
    estadogasto "estadogasto",
    pago "pago",
    TO_CHAR(fecha_pago, 'DD.MM.YYYY') "fecha_pago",
    tipocorte "tipocorte",
    cuotas "cuotas",
    interes "interes"
    from estadogasto natural join gastos LEFT OUTER JOIN tipocorte on gastos.ID_TIPOCORTE=tipocorte.ID_TIPOCORTE
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
 `update gastos
    set id_tipocorte = :id_tipocorte,
    cuotas = :cuotas,
    pago_pactado = :pago_pactado,
    id_estadogasto = :id_estadogasto,
    interes = :interes,
    pago = :pago,
    fecha_pago = :fecha_pago
  where id_gasto = :id_gasto`;
 
async function update(emp) {
  const gasto = Object.assign({}, emp);

  console.log(gasto);
  const result = await database.simpleExecute(updateSql, gasto);
 
  if (result.rowsAffected && result.rowsAffected === 1) {
    return gasto;
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
    id_fases
  ) values (
    :entidad,
    :presupuesto_gasto,
    :fecha_presupuesto_gasto,
    :id_estadogasto,
    :id_fases
  )`;

async function create(uss) {

  console.log(uss);
  
  const gasto = Object.assign({}, uss);

  let result=await database.simpleExecute(createGasto, gasto);
  
  return result.rowsAffected;
}

module.exports.create = create;

////////////////////////////////////////////////////////////////////////


const deleteSql = `BEGIN :val := eliminarGasto(:id); END;`;

async function del(id) {

  const binds = {};
  binds.id = Number(id);
  binds.val = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 500000 };

  const result = await database.simpleExecute(deleteSql, binds);

  
  return result.outBinds;
}

module.exports.del = del;