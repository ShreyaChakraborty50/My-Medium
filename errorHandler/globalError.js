const globalError = (err, req, res, next) => {
  err.message = err.message || "Something went Wrong!";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json(err.message);
};

module.exports = {
  globalError,
};
