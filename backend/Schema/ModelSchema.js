const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
  ],
  // image: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
  // ],
});
module.exports.User = mongoose.model("User", userSchema);

// const imageSchema = mongoose.Schema({
//   image: {
//     data: Buffer,
//     contentType: String,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// module.exports.Image = mongoose.model("Image", imageSchema);

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports.Note = mongoose.model("Note", noteSchema);
