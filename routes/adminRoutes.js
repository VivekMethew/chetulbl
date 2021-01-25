const express = require('express')
const router = express.Router();
const { uuid } = require('uuidv4');
const auth = require('../middleware/auth')
const { login_users } = require('../config/connection')


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
        return res.redirect('/admin/login', { session: req.session })
    } catch (err) {
        return res.send('error', err)
    }
})


module.exports = router