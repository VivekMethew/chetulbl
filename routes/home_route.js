const express = require('express')
const router = express.Router();
const { searchRecord } = require('../config/connection')

router.get('/', (req, res) => {
    try {
        searchRecord('select * from tbl_courses', (err, result) => {
            if (err) {
                return res.send('Error', err)
            }
            // console.log(result.recordset)
            return res.render('home/index', { courses: result })
        })
    } catch (err) {
        return res.send('Error', err)
    }
})

router.get('/courses_tools', (req, res) => {
    try {
        searchRecord('select * from tbl_courses', (err, result) => {
            if (err) {
                return res.send('Error', err)
            }
            // console.log(result.recordset)
            return res.render('home/courses_tools', { courses: result })
        })
    } catch (err) {
        return res.send('Error', err)
    }
})

router.get('/notice_event', (req, res) => {
    res.render('home/notice_event')
})

router.get('/contact', (req, res) => {
    res.render('home/contact')
})

module.exports = router