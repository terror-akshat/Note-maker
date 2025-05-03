const express = require("express");
const route = express.Router();
const multer = require("multer");

const {
  handleRegister,
  handleLogin,
  addNote,
  // authenicator,
  getUser,
  // upload,
  updateUser,
  deleteUser,
  // getImage,
  // uploads,
} = require("../Controller/AuthController");

// const storage = multer.memoryStorage();
// const uploadmiddleware = multer({ storage });

route.post("/register", handleRegister);
// route.post("/upload/:id", uploadmiddleware.single("image"), upload);
route.post("/login", handleLogin);

route.post("/add-note/:id", addNote);
route.get("/get-user/:id", getUser);
// route.get("/image/:id", getImage)

route.put("/update/:id", updateUser);
route.delete("/delete/:id", deleteUser);
module.exports = route;
