function isAuthenticated(req, res, next) {
    const token = req.body.token || req.params.token || req.headers['token'];

    // if (token) {
        return next()
    // }

    res.status(401)
    res.send({
        success: false,
        error: 'Must be logged in.'
    })
}

export { isAuthenticated }