//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_fases "id_fases",
    fase "fase", 
    TO_CHAR(fecha_inicio, 'DD.MM.YYYY') "fecha_inicio",
    fecha_finalizacion "fecha_finalizacion",
    estadofase "estadofase"
    from fases natural join estadofase
  `;


async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = baseQuery;
  const binds = {};


  if (context.id_proyecto) {

    
    binds.id_proyecto = Number(context.id_proyecto);
    query += `\nwhere id_proyecto = :id_proyecto`;

    console.log(query);

    let result = await database.simpleExecute(query, binds);

    

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.find = find;


const selectSucursal=
  `select
    fase "fase", 
    fecha_inicio "fecha_inicio",
    fecha_finalizacion "fecha_finalizacion"
    from fases
  `;

async function getNameFase(context) {
  //console.log(488888);

  let fakeresult = {};

  let query = selectSucursal;
  const binds = {};


  if (context.id_fases) {

    
    binds.id_fases = Number(context.id_fases);
    query += `\nwhere id_fases = :id_fases`;

    let result = await database.simpleExecute(query, binds);

    console.log(result);

    return result.rows;

  } else {

    return fakeresult;

  }

}

module.exports.getNameFase = getNameFase;
//////////////////////////////////////////////////////////////////////
const createFase =
  `insert into fases (
    fase,
    fecha_inicio,
    id_proyecto,
    ID_ESTADOFASE
  ) values (
    :fase,
    CURRENT_TIMESTAMP,
    :id_proyecto,
    :ID_ESTADOFASE
  )`;

async function create(uss) {


  console.log(uss);
  

  const fase = Object.assign({}, uss);


  
  let result=await database.simpleExecute(createFase, fase);

  
  return result.rowsAffected;
}

module.exports.create = create;
