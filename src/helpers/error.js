class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (err, req, res, next) => {
  throw err;
  if (!(err instanceof AppError)) {
    err = new AppError(500, "Something when wrong");
  }

  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });

  next();
};

module.exports = {
  AppError,
  handleError,
};
