const mysql = require('mssql');
const migration = require('./migration.js');

let db = mysql.connect({
    server: "bddchallenge48h.database.windows.net",
    port: 1433,
    user: "userbdd@bddchallenge48h",
    password: "Passwordbdd@",
    database: 'BDD-Challenge48H',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
})
.then((connexion) => {
    console.log("Connected to the database!");
    migration.createDatabase(connexion);
});


module.exports = db;