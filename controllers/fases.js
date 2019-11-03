const fases = require('../db_apis/fases');


function getFaseFromReq(req) {
  const newFase = {
    fase: req.body.fase,
    id_proyecto: Number(req.body.id_proyecto),
    id_estadoFase: Number(1),
  };
  return newFase;
}

async function post(req, res, next) {


  //console.log(req);

  try {
    let newFase= getFaseFromReq(req);

    let resultado =await fases.create(newFase);

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
    context.id_fases=req.query.id_fases;
    context.id_proyecto=req.query.id_proyecto;


    let rows;

    if(req.query.razon=="nombre"){
      console.log("nombre");
      rows=await fases.getNameFase(context)
    }else{
      console.log("todos");
      rows=await fases.find(context);
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