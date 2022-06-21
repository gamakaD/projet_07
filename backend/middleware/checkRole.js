module.exports = (req, res, next) => {
    if (req.headers.role != 'admin') {
        return res.status(401).json({ message: 'Not Allowed' })
    }
    next()
}