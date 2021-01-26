const express = require('express')
const router = express.Router();
const path = require("path");
const { uuid } = require('uuidv4');
const auth = require('../middleware/auth')
const { searchRecord, login_users, proc_courses, insert_event_notices } = require('../config/connection')
const multer = require('multer')
    // const { check, validationResult } = require('express-validator');


router.get('/login', (req, res) => {
    try {
        let sess = req.session
        if (sess.email) {
            return res.redirect('/admin/chetu')
        }
        return res.redirect(`/admin/login/${uuid()}`)
    } catch (err) {
        return res.redirect('/admin/chetu')
    }
})
router.get('/login/:loginid', (req, res) => {
    console.log('Login ID', req.session.email)
    res.render('admin/login')
})

router.post('/login', (req, res) => {
    try {
        let sess = req.session
        login_users(req.body.email, req.body.pass, (err, result) => {
            if (err) {
                return res.redirect('/admin/login')
            }
            if (result.output.idd > 0) {
                sess.email = req.body.email
                sess.username = result.recordset[0].fname
                return res.redirect('/admin/chetu')
            } else {
                return res.redirect('/admin/login')
            }
        })
    } catch (err) {
        return res.send('error', err)
    }
})

// Routes Chetu Dashboard 

router.get('/chetu', auth, async(req, res) => {
    try {
        return res.render('admin/index', { session: req.session })
    } catch (err) {
        return res.send('error', err)
    }
})

router.get('/courses', auth, (req, res) => {
    try {
        searchRecord('select id,c_title,urls,createAt from tbl_courses', (err, result) => {
            if (err) {
                return res.status(203).send('error', err)
            }
            return res.render('admin/courses', { courses: result, session: req.session })
        })
    } catch (err) {
        return res.status(500).send('error', err)
    }
})

router.get('/event_notices', auth, (req, res) => {
    try {
        searchRecord('select id,c_title,urls,createAt from tbl_courses', (err, result) => {
            if (err) {
                return res.status(203).send('error', err)
            }
            return res.render('admin/event_notices', { courses: result, session: req.session })
        })
    } catch (err) {
        return res.status(500).send('error', err)
    }
})

router.get('/trainer', auth, (req, res) => {
    try {
        searchRecord('select id,c_title,urls,createAt from tbl_courses', (err, result) => {
            if (err) {
                return res.status(203).send('error', err)
            }
            return res.render('admin/trainer', { courses: result, session: req.session })
        })
    } catch (err) {
        return res.status(500).send('error', err)
    }
})

router.get('/reviews', auth, (req, res) => {
    try {
        searchRecord('select id,c_title,urls,createAt from tbl_courses', (err, result) => {
            if (err) {
                return res.status(203).send('error', err)
            }
            return res.render('admin/reviews', { courses: result, session: req.session })
        })
    } catch (err) {
        return res.status(500).send('error', err)
    }
})

router.get('/logout', (req, res) => {
    try {
        req.session.destroy()
        console.log('Logout user')
        return res.redirect('/admin/login')
    } catch (err) {
        return res.send('error', err)
    }
})

// post routes
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload/courses')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.png')
    }
})

const upload = multer({ storage: storage })

router.post('/add_courses', upload.single('c_file'), async(req, res) => {
    try {
        let imgurl = `/${req.file.destination}/${req.file.filename}`;
        await proc_courses(req.body.c_title, req.body.c_url, imgurl, (err, result) => {
            if (err) {
                return res.status(203).send({
                    success: false,
                    message: err.message
                })
            }
            if (result.output.idd > 0) {
                return res.status(201).send({ success: true, message: 'success' })
            }
            return res.status(200).send({ success: false, message: 'allready courses exists' })
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
})


const storageEvent = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload/events')
    },
    filename: function(req, file, cb) {
        cb(null, 'event' + '_' + Date.now() + path.extname(file.originalname))
    }
})

const uploadEvent = multer({ storage: storageEvent })

router.post('/add_event', uploadEvent.array('e_files', 10), async(req, res) => {
    try {
        var imgurl
        if (req.files.length > 0) {
            imgurl = `/${req.file.destination}/${req.file.filename}`;
        } else {
            imgurl = null
        }

        await insert_event_notices(
            req.body.e_type,
            req.session.email,
            req.body.e_title,
            req.body.e_desc,
            (req.body.e_date === 'null') ? null : req.body.e_date,
            (req.body.e_time === 'null') ? null : req.body.e_time,
            (req.body.e_day === 'null') ? null : req.body.e_day,
            (req.body.e_vanue === 'null') ? null : req.body.e_vanue,
            imgurl,
            (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(203).send({
                        success: false,
                        message: err.message
                    })
                }
                if (result.output.idd > 0) {
                    return res.status(201).send({ success: true, message: 'success' })
                }
                return res.status(200).send({ success: false, message: 'allready courses exists' })
            })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
})


module.exports = router