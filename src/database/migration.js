const sql = require('mssql')

function createDatabase(connection) {
    const request = "IF OBJECT_ID('dbo.Users', 'U') IS NULL " +
                    "BEGIN " +
                        "CREATE TABLE dbo.Users (" +
                            "id INT IDENTITY(1,1) PRIMARY KEY," +
                            "name VARCHAR(255)," +
                            "password VARCHAR(255)" +
                        ");" +
                    "END;" +
                    "IF OBJECT_ID('dbo.Messages', 'U') IS NULL " +
                    "BEGIN " +
                        "CREATE TABLE dbo.Messages (" +
                            "id INT IDENTITY(1,1) PRIMARY KEY," +
                            "user_id INT NOT NULL," +
                            "message NVARCHAR(MAX)," +
                            "CONSTRAINT FK_UserMessages FOREIGN KEY (user_id) REFERENCES dbo.Users(id)" +
                        ");" +
                    "END;"

    connection.query(request).then(result => {
        console.log('Database and tables created: ', result);
    })
}

module.exports = {createDatabase}