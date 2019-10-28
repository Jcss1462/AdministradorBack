//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_entidad "id_entidad",
    entidad "entidad"
    from entidad natural join trabajador_has_entidad
  `;




async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = baseQuery;
  const binds = {};


  if (context.id_usuario) {

    
    binds.id_usuario = Number(context.id_usuario);
    query += `\nwhere id_usuario != :id_usuario`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    let result = await database.simpleExecute(query, binds);
    console.log(result);
    return result.rows;

  }

}

module.exports.find = find;

const selectEntidad =
  `select 
    entidad "entidad"
    from entidad
  `;

async function getName(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = selectEntidad;
  const binds = {};


  if (context.id_entidad) {

    
    binds.id_entidad = Number(context.id_entidad);
    query += `\nwhere id_entidad = :id_entidad`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.getName = getName;

//////////////////////////////////////////////////////////////////////
const createEntidad =
  `insert into entidad (
    entidad
  ) values (
    :entidad
  )returning id_entidad 
  into :id_entidad`;

async function create(uss) {
  const entidad = Object.assign({}, uss);

  entidad.id_entidad = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }


  
  let result=await database.simpleExecute(createEntidad, entidad);

  entidad.id_entidad = result.outBinds.id_entidad[0];

  return entidad.id_entidad;
}

module.exports.create = create;


const asignacion =
  `insert into Trabajador_has_Entidad (
    id_usuario,
    id_entidad
  ) values (
    :id_usuario,
    :id_entidad
  )`;

async function asignar(asg) {
  const add = Object.assign({}, asg);
 
  await database.simpleExecute(asignacion, add);

  return 1;
}

module.exports.asignar = asignar;

