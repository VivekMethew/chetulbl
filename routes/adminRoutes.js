const express = require('express')
const router = express.Router();
const { uuid } = require('uuidv4');
const auth = require('../middleware/auth')
const { login_users } = require('../config/connection')
const multer = require('multer')


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
                    // console.log('Result', result.recordset, result.output)
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

router.get('/chetu', auth, (req, res) => {
    try {
        return res.render('admin/index', { session: req.session })
    } catch (err) {
        return res.send('error', err)
    }
})

router.get('/courses', auth, (req, res) => {
    try {
        return res.render('admin/courses', { session: req.session })
    } catch (err) {
        return res.send('error', err)
    }
})

router.get('/event_notices', auth, (req, res) => {
    try {
        return res.render('admin/event_notices', { session: req.session })
    } catch (err) {
        return res.send('error', err)
    }
})

router.get('/trainer', auth, (req, res) => {
    try {
        return res.render('admin/trainer', { session: req.session })
    } catch (err) {
        return res.send('error', err)
    }
})

router.get('/reviews', auth, (req, res) => {
    try {
        return res.render('admin/reviews', { session: req.session })
    } catch (err) {
        return res.send('error', err)
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

router.post('/add_courses', upload.single('c_file'), (req, res) => {
    try {
        return res.redirect('/admin/chetu')
    } catch (err) {
        return res.redirect('/admin/login')
    }
})


module.exports = router