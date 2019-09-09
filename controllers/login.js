const log = require('../db_apis/login.js');

//funcion get de la tabla usuario
async function get(req, res, next) {

  console.log("/natun/n")

  try {
    const context = {};
    //le doy un id al contexto segun lo que viene en el req
    context.username = req.query.username;
    context.password = req.query.password;


    console.log("userame= "+context.username);
    console.log("password= "+context.password);

   
    ///retricciones
    context.skip = parseInt(req.query.skip, 10);
    context.limit = parseInt(req.query.limit, 10);

    

    //clasificacion  
    context.sort = req.query.sort;


    ///////filtrado
    context.genero =req.query.genero;
    

    //busca lo enviado
    const rows = await log.find(context);

    console.log(rows.length);
    

    if (req.params.id) {
      if (rows.length === 1) {
        //se encoontro y lo devuelve como json

        res.status(200).json(rows[0]);
      } else {
        //si no se encontro
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

// se exporrta para usarla en el modulo
module.exports.get = get;

