const express = require('express')
const router= express.Router();


router.get('/home',(req, res)=>{
    res.render('home/index')
})

router.get('/courses_tools',(req, res)=>{
    res.render('home/courses_tools')
})

router.get('/notice_event',(req, res)=>{
    res.render('home/notice_event')
})

router.get('/contact',(req, res)=>{
    res.render('home/courses_tools')
})

module.exports = router