const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongo Connect");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongo disconnected");
});

module.exports = connect;
