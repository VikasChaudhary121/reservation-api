const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const roomRouter = require("./routes/rooms");
const hotelRouter = require("./routes/hotels");

mongoose
  .connect(process.env.mongodb)
  .then(() => console.log("MOngo connected Successfully..."));

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected...");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected...");
});

app.get("/", (req, res) => {
  res.send("Hello from Home Page...");
});

// MiddleWres
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/hotels", hotelRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => console.log("Server Is Running On Port 8000"));
