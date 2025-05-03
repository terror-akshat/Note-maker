import axios from "../axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Avtar = ({ id }) => {
  const [file, setFile] = useState(null);

  const handelOnchange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handelUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(`/upload/${id}`, formData);
      console.log(response);
      if (response.data.status === false) {
        toast.error(response.data.msg);
      }
      if (response.data.status === true) {
        console.log("added");
        toast.success(response.data.msg, toastOption);
        file(null)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toastOption = {
    positon: "bottom-right",
    autoclose: 5000,
    theme: "dark",
    draggable: true,
  };

  return (
    <>
      <div className="flex p-6 rounded-lg">
        <div className="outline w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Upload Your Image
          </h2>
          <form encType="multipart/form-data" onSubmit={handelUpload}>
            <div
              id="image-preview"
              className="flex items-center justify-center h-40 mb-4 bg-gray-200 rounded-lg"
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Image Preview"
                  className="object-cover h-full w-full"
                />
              ) : (
                <span className="text-gray-400">No image selected</span>
              )}
            </div>

            <div className="mb-4">
              <input
                type="file"
                name="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handelOnchange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
              <p className="mt-1 text-sm text-gray-500">
                Allowed formats: PNG, JPEG.
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Avtar;
