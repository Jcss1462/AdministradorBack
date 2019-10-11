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