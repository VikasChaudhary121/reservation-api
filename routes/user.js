const express = require("express");

const {
  handlePut,
  handleDelete,
  handleGetOne,
  handleGetAll,
} = require("../controller/users");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("You are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("you are logged in and you can delete your account..");
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("You are the admin");
// });

//UPDATE
router.put("/:id", verifyUser, handlePut);

// DELETE
router.delete("/:id", verifyUser, handleDelete);
// Get
router.get("/:id", verifyUser, handleGetOne);

// GetALL...
router.get("/", verifyAdmin, handleGetAll);

module.exports = router;
