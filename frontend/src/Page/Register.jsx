import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import axios from "../axios";
import { Link } from "react-router-dom";
import bacgoundImage from "../assets/pexels-photo-5828552.jpeg";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toastOption = {
    positon: "bottom-right",
    autoclose: 5000,
    theme: "dark",
    draggable: true,
  };
  // const naviagte = useNavigate();

  const handleOnSubmit = async (e) => {
    if (handleValidation) {
      e.preventDefault();
      try {
        const response = await axios.post("/register", form);
        console.log(response);

        if (response.data.status === false) {
          toast.error(response.msg, toastOption);
        }
        if (response.data.status === true) {
          toast.success("Register Successfull");
          // naviagte("/Avtar");
        }
        setForm({ username: " ", password: " ", email: " " });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = form;
    if (!password || password.length < 8) {
      toast.error("Email and password is required ", toastOption);
      return false;
    } else if (username === "") {
      toast.error("Email and password is required", toastOption);
      return false;
    }
    return true;
  };

  return (
    <>
      <div
        className="flex flex-col gap-10 overflow-hidden min-h-screen justify-center items-center px-7 sm:px-4 md:px-8 bg-custom-image bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${bacgoundImage})`,
        }}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 2)}
          initial="hidden"
          animate="show"
          className="z-10 w-full max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg backdrop-opacity-10 backdrop-invert bg-white/30"
        >
          <p
            className={`text-3xl font-semibold text-center text-gray-800 sm:text-2xl md:text-3xl italic`}
          >
            Register
          </p>
          <form onSubmit={handleOnSubmit} className="mt-12 flex flex-col gap-6">
            <label className="flex flex-col gap-2 ">
              <span className="font-medium text-gray-900 italic">
                Your Name
              </span>
              <input
                type="text"
                name="username"
                value={form.username}
                placeholder="Enter your name"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="bg-gray-100 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-medium text-gray-900 italic">
                Your Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-gray-100 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-medium text-gray-900 italic">
                Your Password
              </span>
              <input
                type="password"
                name="password"
                value={form.password}
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="bg-gray-100 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </label>

            <button className="mt-6 bg-lime-500 text-white p-3 rounded-xl hover:bg-lime-600 transition duration-200 ease-in-out w-full sm:w-auto">
              Submit
            </button>
            <div className="flex flex-row gap-6 justify-center">
              <span> Already have a acount? </span>
              <Link
                to="/login"
                className="font-medium shadow-lg border-none text-gray-1000"
              >
                Login
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
      <ToastContainer />
    </>
  );
};
