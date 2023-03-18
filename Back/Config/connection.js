const { Pool, Client } = require("pg");
require('dotenv/config');

// brate
// const credentials = {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// };

// local
const credentials = {
    user: process.env.DB_LOCAL_USER,
    host: process.env.DB_LOCAL_HOST,
    database: process.env.DB_LOCAL_DATABASE,
    password: process.env.DB_LOCAL_PASSWORD,
    port: process.env.DB_PORT,
};

const pool = new Pool(credentials);
const client = new Client(credentials);

try {
    client.connect();
    console.log("conectado");
} catch (error) {
    console.log(error);
}

module.exports = pool