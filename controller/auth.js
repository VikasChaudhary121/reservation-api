const Users = require("../models/users");
const bcrypt = require("bcrypt");
const createError = require("../utils/erorr");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function register(req, res, next) {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.Password, salt);

    const newUser = await Users.create({
      ...req.body,
      Password: hashedPassword,
    });
    res.status(201).send("User Created SuccessFully!");
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const user = await Users.findOne({ userName: req.body.userName });
    if (!user) {
      return next(createError(404, "user not found!"));
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.Password,
        user.Password
      );
      if (!isPasswordCorrect) {
        next(createError(404, "Wrong Password"));
      } else {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );
        const { Password, isAdmin, ...otherDetails } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ details: { ...otherDetails }, isAdmin });
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
};
