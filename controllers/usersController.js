const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { createPlace } = require("./placesController");
const DUMMY_DATA = [
  {
    id: uuidv4(),
    name: "Habibur rahman",
    email: "habiburrahman054@gmail.com",
    password: "h66666666",
  },
];
const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_DATA });
};
const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed ,please check your data.", 422);
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMY_DATA.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exist.", 402);
  }
  const createedUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_DATA.push(createedUser);
  res.status(201).json({ user: createedUser });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_DATA.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify ,creditials seem to be wrong.",
      401
    );
  }
  res.json({ message: "you are login." });
};
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
