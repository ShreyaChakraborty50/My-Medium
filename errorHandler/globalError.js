const globalError = (err, req, res, next) => {
    return res.status(err.statusCode).json(err.message);
}

module.exports = {
    globalError
}
