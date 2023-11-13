const app = require("./app");
const databaseConnection = require("./config/database");
databaseConnection();
const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`app listening on ${PORT}`);
});
