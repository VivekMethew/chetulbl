const sql = require('mssql')


// Chetu@@1231
// chetulbl_users
// mssql-18768-0.cloudclusters.net,18816

const config = {
    server: "mssql-18768-0.cloudclusters.net",
    user: "chetulbl_users",
    password: "Chetu@@1231",
    database: "chetulbl",
    port: 18816,
    options: {
        encrypt: true
    }
}

const searchRecord = (callback) => {
    var conn = new sql.ConnectionPool(config)
    conn.connect((err) => {
        if (err) throw err
        var req = new sql.Request(conn)
        req.query('select * from tbl_registration', (err, result) => {
            callback(err, result)
        })
    })
}


module.exports = { searchRecord }