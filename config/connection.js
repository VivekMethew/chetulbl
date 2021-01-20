const sql = require('mssql')


const config = {
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.DBPORT,
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