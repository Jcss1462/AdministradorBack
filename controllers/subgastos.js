const subgastos = require('../db_apis/subgastos');

function getSubGastoFromreq(req) {
  const Subgasto = {
    id_estadogasto: Number(req.body.id_estadogasto),
    valorcancelado: Number(req.body.valorcancelado),
    id_gasto: Number(req.body.id_gasto),
    id_subgasto: Number(req.body.id_subgasto),
  };
  return Subgasto;
}

async function put(req, res, next) {
  try {
    let Subgasto = getSubGastoFromreq(req);

    console.log(Subgasto);
    Subgasto = await subgastos.update(Subgasto);

    if (Subgasto !== null) {
      res.status(200).json(Subgasto);
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
    context.id_gasto = req.query.id_gasto;

    let rows;


    rows = await subgastos.find(context);


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
