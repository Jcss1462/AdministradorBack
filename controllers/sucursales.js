const sucursal = require('../db_apis/sucursales');


function getSucrursalFromReq(req) {
  const newSucursal = {
    sucursal: req.body.sucursal,
    direccion: req.body.direccion,
    id_entidad: req.body.id_entidad,

  };
  return newSucursal;
}

async function post(req, res, next) {


  //console.log(req);

  try {
    let newSucursal = getSucrursalFromReq(req);

   
    let resultado =await sucursal.create(newSucursal);

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
    context.id_entidad=req.query.id_entidad;


    let rows = await sucursal.find(context);

    
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