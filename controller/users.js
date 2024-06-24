const Users = require("../models/users");

async function handlePut(req, res) {
  try {
    const updateUser = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
}

async function handleDelete(req, res) {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).send("You are Not Authenticated");
  } catch (err) {
    next(err);
  }
}

async function handleGetOne(req, res) {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

async function handleGetAll(req, res) {
  try {
    const AllUsers = await Users.find();
    res.status(200).send(AllUsers);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  handleDelete,
  handleGetAll,
  handleGetOne,
  handlePut,
};
