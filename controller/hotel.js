const Hotels = require("../models/hotels");
const Rooms = require("../models/rooms");

async function handlePost(req, res, next) {
  //   const newHotel = Hotels.create(req.body);
  const { Name, Type, City, Address, Distance, Title, Desc, CheepestPrice } =
    req.body;

  try {
    const newHotel = Hotels.create({
      Name,
      Type,
      City,
      Address,
      Distance,
      Title,
      Desc,
      CheepestPrice,
    });
    // const savedHotel = await newHotel.save();
    res.status(200).json(newHotel);
  } catch (err) {
    next(err);
  }
}

async function handlePut(req, res) {
  try {
    const updateHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
}

async function handleDelete(req, res) {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).send("You are Not Authenticated");
  } catch (err) {
    next(err);
  }
}

async function handleGetOne(req, res, next) {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).send(hotel);
  } catch (err) {
    next(err);
  }
}

async function handleGetAll(req, res, next) {
  const { min, max, ...others } = req.query;
  const minPrice = parseInt(min, 10) || 1;
  const maxPrice = parseInt(max, 10) || 999;

  try {
    const AllHotels = await Hotels.find({
      ...others,
      CheepestPrice: { $gt: minPrice, $lt: maxPrice },
    });
    res.status(200).send(AllHotels);
  } catch (err) {
    next(err);
  }
}

async function countByCity(req, res, next) {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ City: city });
      })
    );
    res.status(200).send(list);
  } catch (err) {
    next(err);
  }
}

async function countByType(req, res, next) {
  try {
    const hotelCount = await Hotels.countDocuments({ Type: "hotel" });
    const apartmentCount = await Hotels.countDocuments({ Type: "apartment" });
    const resortCount = await Hotels.countDocuments({ Type: "resort" });
    const villasCount = await Hotels.countDocuments({ Type: "villas" });
    const cabinsCount = await Hotels.countDocuments({ Type: "cabins" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villas", count: villasCount },
      { type: "cabins", count: cabinsCount },
    ]);
  } catch (err) {
    next(err);
  }
}

async function getRoomsOfHotel(req, res, next) {
  try {
    const hotel = await Hotels.findById(req.params.id);
    const list = await Promise.all(
      hotel.Rooms.map((room) => {
        return Rooms.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  handleDelete,
  handleGetAll,
  handleGetOne,
  handlePost,
  handlePut,
  countByCity,
  countByType,
  getRoomsOfHotel,
};
