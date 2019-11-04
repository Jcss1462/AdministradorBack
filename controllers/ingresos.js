const ingresos = require('../db_apis/ingresos');


function getFaseFromReq(req) {
  const newIngreso = {
    entidad: req.body.entidad,
    presupuesto: Number(req.body.presupuesto),
    fecha_presupuesto_ingreso: req.body.fecha_presupuesto,
    id_estadoingreso: Number(req.body.id_estadoingreso),
    id_tipoingreso: Number(req.body.id_tipoingreso),
    id_fase: Number(req.body.id_fase),
  };
  return newIngreso;
}

async function post(req, res, next) {


  //console.log(req);

  try {
    let newIngreso = getFaseFromReq(req);

    let resultado = await ingresos.create(newIngreso);

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
    context.id_fase = req.query.id_fase;

    let rows;


    rows = await ingresos.find(context);


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