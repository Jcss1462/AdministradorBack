//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');



const asignacion =`BEGIN :val := verificar_ingreso(:idUser,:idIng); END;`;

async function asignar(asg) {

  let add = Object.assign({}, asg);
  add.val = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 500000 };
  const result = await database.simpleExecute(asignacion, add);
  console.log(result.outBinds.val);
  return result.outBinds.val;
}

module.exports.asignar = asignar;

//////////////////////////////
const baseQuery =
  `select
    id_ingreso "id_ingreso",
    ingreso "invertido", 
    interes "interes",
    TO_CHAR(fecha_ingreso, 'DD.MM.YYYY') "fecha_inversion",
    cuotas "cuotas_fijadas",
    pago_pactado "ganancia_total",
    pago  "ganacia_actual",
    TO_CHAR(fecha_pago, 'DD.MM.YYYY') "fecha_retribucion"
  from INVERSOR_HAS_INGRESO natural join ingresos natural join INGRESOS_HAS_GASTOS natural join gastos
  `;




async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  if (context.id_usuario) {

    let query = baseQuery;
    const binds = {};

    binds.id_usuario = Number(context.id_usuario);
    query += `\nwhere INVERSOR_HAS_INGRESO.ID_USUARIO=:id_usuario`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;



