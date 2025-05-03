import axios from "axios";

const instance = axios.create({
  baseURL: "https://note-maker-g6hw.onrender.com/auth",
});

export default instance;
