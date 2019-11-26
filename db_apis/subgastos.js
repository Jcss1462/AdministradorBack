//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select
    id_subgasto "id_subgasto",
    id_gasto "id_gasto",  
    TO_CHAR(fecha_de_pago, 'DD.MM.YYYY') "fecha_de_pago", 
    estadogasto "estadogasto",
    valor_a_pagar "valor_a_pagar",
    valorcancelado "valorcancelado"
  from subgastos natural join estadogasto
  `;


async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = baseQuery;
  const binds = {};


  if (context.id_gasto) {

    binds.id_gasto = Number(context.id_gasto);
    query += `\nwhere id_gasto = :id_gasto
                order by fecha_de_pago asc`;

    console.log(query);

    let result = await database.simpleExecute(query, binds);

  
    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;
/////////////////////////////////////////////////////////////////////

const updateSql = `BEGIN :val := updateSubgasto(:valorcancelado,:id_estadogasto,:id_subgasto,:id_gasto); END;`;
 
async function update(emp) {

  let subgasto = Object.assign({}, emp);
  //console.log(subgasto);
  subgasto.val = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 500000 };
  const result = await database.simpleExecute(updateSql, subgasto);
 
 
  return  result.outBinds;
  
}
 
module.exports.update = update;


