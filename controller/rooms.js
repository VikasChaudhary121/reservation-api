const Rooms = require("../models/rooms");
const Hotels = require("../models/hotels");
const createError = require("../utils/erorr");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Rooms(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { Rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

async function updateRoom(req, res, next) {
  try {
    const updateRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
}

async function updateRoomAvailability(req, res, next) {
  try {
    await Rooms.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json({ status: "Rooms Availability updated successfully" });
  } catch (err) {
    next(err);
  }
}

async function deleteRoom(req, res) {
  const hotelId = req.params.hotelId;
  try {
    await Rooms.findByIdAndDelete(req.params.id);
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $pull: { Rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).send("Deleted Successfully");
  } catch (err) {
    next(err);
  }
}

async function GetOneRoom(req, res) {
  try {
    const room = await Rooms.findById(req.params.id);
    res.status(200).send(room);
  } catch (err) {
    next(err);
  }
}

async function GetAllRooms(req, res) {
  try {
    const AllRooms = await Rooms.find();
    res.status(200).send(AllRooms);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createRoom,
  updateRoom,
  updateRoomAvailability,
  deleteRoom,
  GetAllRooms,
  GetOneRoom,
};
