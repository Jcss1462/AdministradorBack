//logica de la base de datos
const database = require('../services/database.js');
//const oracledb = require('oracledb');



const createSql =
  `insert into usuariotemporal (
    nombre,
    username,
    passtmp,
    id_Tipo
  ) values (
    :nombre,
    :username,
    :passtmp,
    :id_Tipo
  )`;

async function create(uss) {
  const usuario = Object.assign({}, uss);

  await database.simpleExecute(createSql, usuario);

  return 1;
}

module.exports.create = create;


///////////////////////////////////////

const baseQuery =
  `select 
    id_usuario "id_usuario",
    nombre "nombre",
    id_tipo "tipo"
    from usuario`;




async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  if (context.id_usuario) {

    let query = baseQuery;
    const binds = {};

    binds.id_usuario = Number(context.id_usuario);
    query += `\nwhere id_usuario = :id_usuario`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;

