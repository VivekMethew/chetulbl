const auth = (req, res, next) => {
    var session = req.session
    if (session.email) {
        return res.redirect('/admin/chetu')
    }
    next()
}

module.exports = auth