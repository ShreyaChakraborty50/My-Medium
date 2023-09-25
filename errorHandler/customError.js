const customError = (statusCode, message) => {
  const customError = new Error();
  customError.message = message;
  customError.statusCode = statusCode;
  return customError;
};

module.exports = {
  customError
};
