//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');



const asignacion =
  `insert into Cliente_has_sucursales (
    id_usuario,
    id_sucursal
  ) values (
    :id_usuario,
    :id_sucursal
  )`;

async function asignar(asg) {
  const add = Object.assign({}, asg);
 
  await database.simpleExecute(asignacion, add);

  return 1;
}

module.exports.asignar = asignar;

//////////////////////////////
const baseQuery =
  `select
    id_sucursal "id_sucursal", 
    sucursal "sucursal",
    direccion "direccion",
    cantidad "cantidad"
   from Cliente_has_sucursales natural join sucursales natural join proyectos_activos
  `;




async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  if (context.id_usuario) {

    let query = baseQuery;
    const binds = {};

    binds.id_usuario = Number(context.id_usuario);
    query += `\nwhere Cliente_has_sucursales.ID_USUARIO = :id_usuario`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;



