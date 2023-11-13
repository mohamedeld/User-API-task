const mongoose = require("mongoose");
console.log(process.env.DB_URL);
// connect to database
const databaseConnection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      family: 4,
    })
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
};

module.exports = databaseConnection;
