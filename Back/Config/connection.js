const { Pool, Client } = require("pg");

const credentials = {
    user: "tournament",
    host: "10.1.82.88",
    database: "pktour",
    password: "senha@123",
    port: 5432,
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