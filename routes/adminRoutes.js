const express = require('express')
const router = express.Router();
const { uuid } = require('uuidv4');
const auth = require('../middleware/auth')


router.get('/login', auth, (req, res) => {
    res.redirect(`/admin/login/${uuid()}`)
})
router.get('/login/:loginid', auth, (req, res) => {
    console.log('Login ID', req.session.email)
    res.render('admin/login')
})
router.post('/login', auth, (req, res) => {
    let sess = req.session
    sess.email = req.body.email
    console.log('Session ID ', sess.email)
    res.redirect('/admin/login')
})

router.get('/chetu', auth, (req, res) => {
    res.render('admin/index')
})

router.get('/courses', auth, (req, res) => {
    res.render('admin/courses')
})

router.get('/event_notices', auth, (req, res) => {
    res.render('admin/event_notices')
})

router.get('/trainer', auth, (req, res) => {
    res.render('admin/trainer')
})

router.get('/reviews', auth, (req, res) => {
    res.render('admin/reviews')
})


module.exports = router