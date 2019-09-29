//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery =
  `select 
    id_usuario "id_usuario",
    nombre "nombre",
    username "username",
    id_tipo "id_tipo"
    from usuario`;


async function find(context) {
  //console.log(488888);

  let fakeresult= {};

  if (context.username && context.password) {



    let auto = await autenticacion(context.username, context.password);

    let prueba = Number(auto.val);
    console.log(prueba);


    if (prueba != 0) {
      let permiso = auto.val;
      console.log("permiso= " + permiso);

      console.log("empiezo la extraccion de datos");

      let query;
      const binds = {};
      binds.id_usuario = permiso;

      console.log("¿problemas?");

      query = baseQuery + `\nwhere id_usuario = :id_usuario`;

      console.log("query= " + query);

      let result = await database.simpleExecute(query, binds);

      console.log('Extraccion de datos finalizada');
      return result.rows;



    } else {

      console.log("error");
      
      return fakeresult;
    }
  }else{

    return fakeresult;

  }

}

module.exports.find = find;


const verificacion = `BEGIN :val := login(:user,:pass); END;`;

async function autenticacion(username, password) {
  console.log('autenticacion empezo');
  const binds = {};
  binds.user = username;
  binds.pass = password;
  binds.val = { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 500000 };
  const result = await database.simpleExecute(verificacion, binds);
  console.log('autenticacion termino');
  return result.outBinds;
}