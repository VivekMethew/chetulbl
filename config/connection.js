const sql = require('mssql')

const config = {
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
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

const login_users = (email, pass, callback) => {
    var conn = new sql.ConnectionPool(config)
    conn.connect(function(err) {
        var request = new sql.Request(conn);
        request.input('email', sql.VarChar(100), email);
        request.input('pass', sql.VarChar(100), pass);
        request.output('idd', sql.BigInt);
        request.execute('login_users', (err, result) => {
            callback(err, result)
            conn.close()
        })
    })
}

module.exports = { searchRecord, login_users }


// Chetu@@1231
// chetulbl_users
// mssql-18768-0.cloudclusters.net,18816