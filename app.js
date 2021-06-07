const express = require("express");
const bodyParser = require("body-parser");
const placesRouter = require("./routes/placesRoutes");
const userRouter = require("./routes/userRoutes");
const HttpError = require("./models/http-error");
const app = express();
app.use(bodyParser.json());
app.use("/api/places", placesRouter);
app.use("/api/users", userRouter);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});
app.listen(5000, () => {
  console.log("Server is connected.");
});
