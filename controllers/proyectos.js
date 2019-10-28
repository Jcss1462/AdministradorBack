const proyectos = require('../db_apis/proyectos');


function getProyectoFromReq(req) {
  const newProyecto = {
    proyecto: req.body.proyecto,
    id_sucursal: Number(req.body.id_sucursal),
    id_estado: Number(req.body.id_estado),
  };
  return newProyecto;
}

async function post(req, res, next) {


  //console.log(req);

  try {
    let newProyecto= getProyectoFromReq(req);

    let resultado =await proyectos.create(newProyecto);

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
    context.id_sucursal=req.query.id_sucursal;
    context.id_proyecto=req.query.id_proyecto;


    let rows;

    if(req.query.razon=="nombre"){
      console.log("nombre");
      rows=await proyectos.getNameProyecto(context)
    }else{
      console.log("todos");
      rows=await proyectos.find(context);
    }

    
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