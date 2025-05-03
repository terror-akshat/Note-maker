const { User, Note, Image } = require("../Schema/ModelSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.json({ msg: "User is already register", status: false });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      password: hash,
    });
    const saveUser = await newUser.save();
    console.log(saveUser);
    return res.json({ status: true, saveUser });
  } catch (error) {
    next(error);
  }
};

// const upload = async (req, res) => {
//   const { id } = req.params;
//   const { file } = req;
//   if (!file) return res.json({ status: false, msg: "File not Found" });
//   try {
//     const img = {
//       data: file.buffer,
//       contentType: file.mimetype,
//     };
//     // console.log(file);
//     // console.log(img);
//     const saveImage = new Image({
//       images: img,
//       user: id,
//     });
//     const saved = await saveImage.save();
//     await User.findByIdAndUpdate(
//       id,
//       {
//         $push: { image: saved._id },
//       },
//       { new: true }
//     );
//     return res.json({ status: true, msg: "Image uploded succesfull" });
//   } catch (error) {
//     return res.json({ status: false, msg: error });
//   }
// };

const handleLogin = async (req, res) => {
  try {
    const foundUser = await User.findOne({
      email: req.body.email,
    });
    if (!foundUser) {
      return res.json({ status: false, msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if (!isMatch) {
      return res.json({ status: false, msg: "wrong password" });
    }
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({ status: true, token, user: foundUser });
  } catch (error) {
    next(error);
  }
};

const authenicator = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // req.userId = await User.findById(decode.id);
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const addNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.json({
      status: false,
      msg: "Both title and content is required",
    });
  }
  try {
    const newNote = new Note({
      title,
      content,
      user: id,
    });

    const saveNote = await newNote.save();
    await User.findByIdAndUpdate(id, {
      $push: { notes: saveNote._id },
    });
    res.json({
      status: true,
      msg: "Note Added Successfully",
      saveNote: saveNote,
    });
  } catch (error) {
    res.json({ status: false, msg: error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("notes");
    if (!user) {
      return res.json({ status: false, msg: "User not found" });
    }
    res.json({ status: true, user: user });
  } catch (error) {
    return res.json({ status: false, msg: "Server error" });
  }
};

// const getImage = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const images = await Image.findById(id);
//     // const images = await image.findById(id);
//     // const images = await User.findById(id).populate("image");
//     if (!images) {
//       return res.json({ status: false, msg: "Image not Found" });
//     }
//     const formateImage = images.map((img)=>({

//     }))
//     // const formateImage = images.image.map(() => ({
//     //   id: img._id,
//     //   contentType: img.contentType,
//     //   base64: `data:${img.contentType};base64,${Buffer.from(
//     //     img.data.data
//     //   ).toStirng("base64")}`,
//     // }));

//     return res.json({ status: true, images: formateImage });
//   } catch (error) {
//     return res.json({ status: false, msg: error });
//   }
// };

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.json({
      status: false,
      msg: "Both title and content is required",
    });
  }

  try {
    const updateValue = await Note.findByIdAndUpdate(
      id,
      { title, content },
      {
        new: true,
      }
    );
    return res.json({
      status: true,
      msg: "Update Succesfully",
      value: updateValue,
    });
  } catch (error) {
    res.json({ status: false, msg: error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await Note.findByIdAndDelete(id);
    return res.json({ status: true, msg: "Delete Successfully" });
  } catch (error) {
    return res.json({ status: false, msg: error });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  addNote,
  authenicator,
  getUser,
  // upload,
  updateUser,
  deleteUser,
  // uploads,
  // getImage,
};
