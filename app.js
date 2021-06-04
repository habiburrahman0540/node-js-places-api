const express = require("express");
const bodyParser = require("body-parser");
const placesRouter = require("./routes/places-routes");
const HttpError = require("./models/http-error");
const app = express();
app.use(bodyParser.json());
app.use("/api/places", placesRouter);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});
app.listen(5000);
