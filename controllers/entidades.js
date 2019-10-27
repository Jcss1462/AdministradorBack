const trbajadorEntidad = require('../db_apis/entidades');


function getEntidadFromReq(req) {
  const newEntidad = {
    entidad: req.body.entidad
  };
  return newEntidad;
}

async function post(req, res, next) {

  
  //console.log(req);

  try {
    let newEntidad = getEntidadFromReq(req);
    
    //creo un nueva entidad
    newEntidad = await trbajadorEntidad.create(newEntidad);

    //agrego la entidad al usuario que la creo

    const asignacion = {
      id_usuario: Number(req.body.creador),
      id_entidad: Number(newEntidad),
    };

    let resultado = await trbajadorEntidad.asignar(asignacion);
    res.status(201).json(resultado);
  
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
    

    ///retricciones
    context.skip = parseInt(req.query.skip, 10);
    context.limit = parseInt(req.query.limit, 10);

    

    //clasificacion  
    context.sort = req.query.sort;


    ///////filtrado
    context.genero =req.query.genero;
    

    //busca lo enviado
    const rows = await trbajadorEntidad.find(context);

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