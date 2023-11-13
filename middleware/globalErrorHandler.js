const sendErrorForDevelopment = (err, response) => {
  response.status(err.statusCode || 500).json({
    status: err.status || "error",
    error: err ? err : { message: "Internal Server Error" },
    message: err ? err.message : "An error occurred",
    stack: err ? err.stack : "No stack trace available",
  });
};

const sendErrorForProduction = (err, response) => {
  if (err && err.isOperational) {
    response.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message || "An error occurred",
    });
  } else {
    response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = (err, request, response, next) => {
  if (!err) {
    return next();
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDevelopment(err, response);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorForProduction(err, response);
  }
};
