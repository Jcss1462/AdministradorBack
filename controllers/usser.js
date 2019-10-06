const usser = require('../db_apis/usser');

function getUsserFromReq(req) {
  const newusser = {
    nombre: req.query.name,
    username: req.query.email,
    passtmp: req.query.password,
    id_tipo: Number(req.query.tipo),
  };

  
 
  return newusser;
}

async function post(req, res, next) {

  
  try {
    let newusser = getUsserFromReq(req);
    
    newusser = await usser.create(newusser);
 
    res.status(201).json(newusser);
  } catch (err) {
    next(err);
  }
}
 
module.exports.post = post;