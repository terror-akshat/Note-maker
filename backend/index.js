const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

const connect = require("./Model/Model");
const apiRoute = require("./Router/ApiRouter");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://curious-profiterole-8d459b.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connect();
app.use("/auth/", apiRoute);

// app.get("/", (_, res) => {
//   return res.status(200).json({ status: "healty" });
// });

app.listen(process.env.PORT, () => {
  // res.write("hellero");
  // console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`Server is running on port 5000`);
});
