const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
let DUMMY_DATA = [
  {
    id: "p1",
    title: "Empire State Building",
    description:
      "The Empire State Building is located on the west side of Fifth Avenue in Manhattan, between 33rd Street to the south and 34th Street to the north.[14] Tenants enter the building through the Art Deco lobby located at 350 Fifth Avenue. Visitors to the observatories use an entrance at 20 West 34th Street; prior to August 2018, visitors entered through the Fifth Avenue lobby.",
    location: {
      lat: 40.7485452,
      lng: -73.9879522,
    },
    address: "New York, NY 10001, USA",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Mumtaz Building",
    description:
      "The Mumtaz Building is located on the west side of Fifth Avenue in Manhattan, between 33rd Street to the south and 34th Street to the north.[14] Tenants enter the building through the Art Deco lobby located at 350 Fifth Avenue. Visitors to the observatories use an entrance at 20 West 34th Street; prior to August 2018, visitors entered through the Fifth Avenue lobby.",
    location: {
      lat: 40.7485452,
      lng: -73.9879522,
    },
    address: "india",
    creator: "u1",
  },
];
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_DATA.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find place for the provided place id.", 404);
  }
  res.json(place);
};
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_DATA.filter((p) => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }
  res.json({ places });
};
const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed ,please check your data.", 422);
  }
  const { title, description, location, address, creator } = req.body;
  const data = {
    id: uuidv4(),
    title: title,
    description: description,
    location: location,
    address: address,
    creator: creator,
  };
  DUMMY_DATA.push(data);
  res.status(201).json({ places: data });
};
const updatePlace = (req, res, next) => {
  const { title, description, address } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_DATA.find((p) => p.id === placeId) };
  const placesIndex = DUMMY_DATA.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  updatedPlace.address = address;
  DUMMY_DATA[placesIndex] = updatedPlace;
  res.status(200).json({ updated: updatedPlace });
};
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_DATA.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find Place for this id.", 404);
  }
  DUMMY_DATA = DUMMY_DATA.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Place successfully deleted." });
};
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
