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

const searchRecord = (qry, callback) => {
    var conn = new sql.ConnectionPool(config)
    conn.connect((err) => {
        if (err) throw err
        var req = new sql.Request(conn)
        req.query(qry, (err, result) => {
            callback(err, result.recordset)
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

const proc_courses = (c_title, urls, img_url, callback) => {
    var conn = new sql.ConnectionPool(config)
    conn.connect(function(err) {
        var request = new sql.Request(conn);
        request.input('c_title', sql.VarChar(100), c_title);
        request.input('urls', sql.VarChar(100), urls);
        request.input('img_url', sql.VarChar(100), img_url);
        request.output('idd', sql.BigInt);
        request.execute('proc_courses', (err, result) => {
            callback(err, result)
            conn.close()
        })
    })
}

const insert_event_notices = (e_type, userid, e_title, e_desc, e_date, e_vanue, e_imgs, callback) => {
    var conn = new sql.ConnectionPool(config)
    conn.connect(function(err) {
        var request = new sql.Request(conn);
        request.input('e_type', sql.VarChar(100), e_type);
        request.input('userid', sql.VarChar(100), userid);
        request.input('e_title', sql.VarChar(100), e_title);
        request.input('e_desc', sql.VarChar(sql.MAX), e_desc);
        request.input('e_date', sql.VarChar(100), e_date);
        request.input('e_vanue', sql.VarChar(200), e_vanue);
        request.input('e_imgs', sql.VarChar(sql.MAX), e_imgs);
        request.output('idd', sql.BigInt);
        request.execute('insert_event_notices', (err, result) => {
            callback(err, result)
            conn.close()
        })
    })
}


const insert_tbl_employee = (emp_desg, fname, lname, email, phone, callback) => {
    var conn = new sql.ConnectionPool(config)
    conn.connect(function(err) {
        var request = new sql.Request(conn);
        request.input('emp_desg', sql.VarChar(100), emp_desg);
        request.input('fname', sql.VarChar(100), fname);
        request.input('lname', sql.VarChar(100), lname);
        request.input('email', sql.VarChar(100), email);
        request.input('phone', sql.VarChar(15), phone);
        request.output('idd', sql.BigInt);
        request.execute('insert_tbl_employee', (err, result) => {
            callback(err, result)
            conn.close()
        })
    })
}


const insert_reviews = (userid, r_title, r_desc, r_img, callback) => {
    var conn = new sql.ConnectionPool(config)
    conn.connect(function(err) {
        var request = new sql.Request(conn);
        request.input('userid', sql.VarChar(100), userid);
        request.input('r_title', sql.VarChar(100), r_title);
        request.input('r_desc', sql.VarChar(sql.MAX), r_desc);
        request.input('r_img', sql.VarChar(sql.MAX), r_img);
        request.output('idd', sql.BigInt);
        request.execute('insert_reviews', (err, result) => {
            callback(err, result)
            conn.close()
        })
    })
}




module.exports = {
    searchRecord,
    login_users,
    proc_courses,
    insert_event_notices,
    insert_tbl_employee,
    insert_reviews
}