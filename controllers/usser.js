const usser = require('../db_apis/usser');

function getUsserFromReq(req) {
  const newusser = {
    nombre: req.body.name,
    username: req.body.email,
    passtmp: req.body.password,
    id_tipo: Number(req.body.tipo),
  };

  
 
  return newusser;
}

async function post(req, res, next) {

  
  console.log(req);

  try {
    let newusser = getUsserFromReq(req);
    
    newusser = await usser.create(newusser);
 
    res.status(201).json(newusser);
  } catch (err) {
    next(err);
  }
}
 
module.exports.post = post;


/////////////////////////////////////

async function get(req, res, next) {

  console.log("/natun/n")

  try {
    const context = {};
    //le doy un id al contexto segun lo que viene en el req
    context.id_usuario = req.query.id_usuario;
    


    console.log("usser_id= "+context.id_usuario);
    

   
    ///retricciones
    context.skip = parseInt(req.query.skip, 10);
    context.limit = parseInt(req.query.limit, 10);

    

    //clasificacion  
    context.sort = req.query.sort;


    ///////filtrado
    context.genero =req.query.genero;
    

    //busca lo enviado
    const rows = await usser.find(context);

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