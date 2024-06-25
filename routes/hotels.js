const express = require("express");
const Hotels = require("../models/hotels");
const createError = require("../utils/erorr");
const {
  handlePost,
  handlePut,
  handleDelete,
  handleGetOne,
  handleGetAll,
  countByCity,
  countByType,
  getRoomsOfHotel,
} = require("../controller/hotel");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

// Create
router.post("/", verifyAdmin, handlePost);

//UPDATE
router.put("/:id", verifyAdmin, handlePut);

// DELETE
router.delete("/:id", verifyAdmin, handleDelete);
// Get
router.get("/find/:id", handleGetOne);

// GetALL...
router.get("/", handleGetAll);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/rooms/:id", getRoomsOfHotel);

module.exports = router;
