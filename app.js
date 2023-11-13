const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const mongoSanitize = require("express-mongo-sanitize");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const userRouter = require("./routes/userRoutes");

const app = express();

process.on("uncaughtException", (err) => {
  console.log("unhandle exception shutting down");
  console.log(err.name, err.message);
  process.exit(1);
});

//prevent injection attacks.
app.use(mongoSanitize());

// get data from .env file
dotenv.config();

// parse incoming JSON payloads from http requests
app.use(express.json({ limit: "20kb" }));

// log request and response if there was an error
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
// routes
app.use("/users", userRouter);
// not found
app.use((request, response, next) => {
  response.status(404).json({
    message: "Page Not Found",
  });
});
// global errors
app.use(globalErrorHandler);
// error outside express
process.on("unhandledRejection", (error) => {
  console.log(`UnhandledRejection ${error}`);
  server.close(() => {
    console.error("Shut down...");
    process.exit(1);
  });
});

module.exports = app;
