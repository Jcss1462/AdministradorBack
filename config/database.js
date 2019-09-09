module.exports = {
  'gestor': {
    user: process.env.NODE_ORACLEDB_USER || "system",
    password: process.env.NODE_ORACLEDB_PASSWORD || "oracle",
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/xe",

    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
    
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0

    
  }
};