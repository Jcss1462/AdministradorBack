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
//////////////////////////////////////////////////

function getIngresoFromreq(req) {
  const Ingreso = {
    id_ingreso: Number(req.body.id_ingreso),
    id_estadoingreso: Number(req.body.id_estadoingreso),
    ingreso: Number(req.body.ingreso),
    interes: Number(req.body.interes),
    fecha_ingreso: req.body.fecha_ingreso,
  };
  return Ingreso;
}

async function put(req, res, next) {
  try {
    let ingreso = getIngresoFromreq(req);

    ingreso = await ingresos.update(ingreso);

    if (ingreso !== null) {
      res.status(200).json(ingreso);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;



////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////
async function del(req, res, next) {
  try {
    const id_ingreso = parseInt(req.query.id_ingreso);
 
    console.log(55555);
    const success = await ingresos.del(id_ingreso);

    console.log(55555);
 
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.del = del;