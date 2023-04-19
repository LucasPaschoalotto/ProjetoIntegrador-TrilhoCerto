import pg from "pg";
const { Pool } = pg;

//Endereço do DB
const linkDataBase = { connectionString: "postgres://segmwoft:i2hisd-_vbPW4I_vSNwNMxf2GmJR40_T@babar.db.elephantsql.com/segmwoft"};

//Conexão com o DB
const dataBase = new Pool(linkDataBase);

export default dataBase;