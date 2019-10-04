const pgp = require('pg-promise')();

const connection_details = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
};

const connection = pgp(connection_details);

module.exports = connection;