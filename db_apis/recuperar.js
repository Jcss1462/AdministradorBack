//logica de la base de datos
const database = require('../services/database.js');
const oracledb = require('oracledb');



async function find(context) {
  //console.log(488888);

  let fakeresult = {};

  if (context.email) {


    console.log("Comenzando verificacion de existencia del correo");

    let recuperar = await recuperar_contraseña(context.email);

    let prueba = recuperar.val;

    if (prueba != "0") {
      console.log('Correo registra, comenzando el envio del email');
      console.log('contraseña= ' + prueba);


      let body={};

      body.to=context.email;
      body.asunto="Recuperacion de contraseña";
      body.texto="Su contraseña es: "+"'"+prueba+"'";

      var EmailCtrl = require('../controllers/mailCtrl');
      EmailCtrl.sendEmail(body);

    
      console.log('¿funciona?');
      console.log('Extraccion de datos finalizada');

      let result={};
      result.val=1;

      return result;
    } else {

      console.log('Usuario no registrado');
      return fakeresult;

    }

  } else {

    console.log('Email no recibido');
    return fakeresult;

  }

}

module.exports.find = find;

const verificacion = `BEGIN :val := recuperar(:user); END;`;

async function recuperar_contraseña(username) {
  console.log('recuperacion empezo');
  const binds = {};
  binds.user = username;
  binds.val = { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 500000 };
  const result = await database.simpleExecute(verificacion, binds);
  console.log('recuperacion termino');
  return result.outBinds;
}

