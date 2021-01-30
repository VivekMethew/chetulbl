const { searchRecord } = require('../../config/connection')

const reviews = async() => {
    await searchRecord('select * from reviews', (err, result) => {
        if (err) throw err
        return result
    })
    return 'hello'
}


const courses = async() => {
    await searchRecord('select * from tbl_courses', (err, result) => {
        if (err) throw err
        console.log(result)
    })
    return 'hello'
}


module.exports = { courses, reviews }