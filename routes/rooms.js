const express = require("express");
const createError = require("../utils/erorr");
const { verifyAdmin } = require("../utils/verifyToken");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  GetOneRoom,
  GetAllRooms,
  updateRoomAvailability,
} = require("../controller/rooms");
const router = express.Router();

// Create
router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
// Get
router.get("/:id", GetOneRoom);

// GetALL...
router.get("/", GetAllRooms);

module.exports = router;
