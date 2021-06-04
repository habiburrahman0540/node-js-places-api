const express = require("express");
const placesController = require("../controllers/places-controller");
const router = express.Router();

router.get("/:pid", placesController.getPlaceById);
router.get("/user/:uid", placesController.getPlacesByUserId);
router.post("/create-place", placesController.createPlace);
router.patch("/:pid", placesController.updatePlace);
router.delete("/:pid", placesController.deletePlace);
module.exports = router;
