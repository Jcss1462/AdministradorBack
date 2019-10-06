//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');



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

