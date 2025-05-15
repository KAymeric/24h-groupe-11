const mysql = require('mssql');

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
.then(() => {
    console.log("Connected to the database!");
});


module.exports = db;