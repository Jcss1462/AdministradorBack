const gastos = require('../db_apis/gastos');


function getGastoFromReq(req) {
  const newGasto = {
    entidad: req.body.entidad,
    presupuesto_gasto: Number(req.body.presupuesto_gasto),
    fecha_presupuesto_gasto: req.body.fecha_presupuesto_gasto,
    id_estadogasto: Number(req.body.id_estadogasto),
    id_fases: Number(req.body.id_fases),
  };
  return newGasto;
}

async function post(req, res, next) {


  //console.log(req);

  try {
    let newgasto = getGastoFromReq(req);

    let resultado = await gastos.create(newgasto);

    res.status(201).json(resultado);

  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
//////////////////////////////////////////////////

function getGastoFromreq(req) {
  const Gasto = {
    id_gasto: Number(req.body.id_gasto),
    pago_pactado: Number(req.body.pago_pactado),
    id_tipocorte: Number(req.body.id_tipocorte),
    cuotas: Number(req.body.cuotas),
    id_estadogasto: Number(req.body.id_estadogasto),
    interes: Number(req.body.interes),
    pago: Number(req.body.pago),
    fecha_pago: req.body.fecha_pago
  };
  return Gasto;
}

async function put(req, res, next) {
  try {
    let gasto = getGastoFromreq(req);

    //console.log(gasto);
    gasto = await gastos.update(gasto);

    if (gasto !== null) {
      res.status(200).json(gasto);
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


    rows = await gastos.find(context);


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
    const id_gasto = parseInt(req.query.id_gasto);
 
    console.log(55555);
    const success = await gastos.del(id_gasto);
    console.log(success);
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