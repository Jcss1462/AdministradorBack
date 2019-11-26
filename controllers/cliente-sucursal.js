const cliente_sucursal = require('../db_apis/cliente-sucursal');


async function post(req, res, next) {

  //console.log(req);

  try {


    //agrego la entidad al cliente

    const asignacion = {
      id_usuario: Number(req.body.cliente),
      id_sucursal: Number(req.body.codigo),
    };

    console.log(asignacion);

    let resultado = await cliente_sucursal.asignar(asignacion);
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
    context.id_sucursal = req.query.id_sucursal;

    console.log(context);

    let rows;
    //busca lo enviado

    rows = await cliente_sucursal.find(context);


    console.log(5678);

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