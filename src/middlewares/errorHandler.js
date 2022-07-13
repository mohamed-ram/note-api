const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);

  // mongoose bad requiest for ObjectId.
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const duplicatedField = err.message
      .split(" ")
      .map((el, key, array) => el.includes("index:") && array[key + 1])
      .filter(Boolean)[0]
      .replace(/\_\d+/g, "");

    const message = `${duplicatedField} must be unique.`;
    error = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((error) => error.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({
      success: false,
      error: error.message || "Server error, try again later..",
    });
};

module.exports = errorHandler;
