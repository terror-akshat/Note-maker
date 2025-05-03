import axios from "../axios";
import React, { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Read = () => {
  const location = useLocation();
  const { id } = useParams();
  const { users } = location.state;
  // console.log(users.notes);
  if (!users || !users.notes) {
    return <p>Loading...</p>; // Or handle gracefully
  }
  const note = users.notes.find((note) => String(note._id) === id);
  // console.log(note);

  const [click, setClick] = useState(false);
  const toggle = () => {
    setClick(true);
  };
  const [Values, setValues] = useState({
    title: note.title,
    content: note.content,
  });

  const toastOption = {
    positon: "bottom-right",
    autoclose: 5000,
    theme: "dark",
    draggable: true,
  };

  const handelOnUpdate = async (e) => {
    e.preventDefault();
    try {
      const { title, content } = Values;
      const response = await axios.put(`/update/${id}`, {
        title,
        content,
      });
      console.log(response);

      if (response.data.status === false) {
        toast.error(response.data.msg, toastOption);
      }
      if (response.data.status === true) {
        toast.success(response.data.msg, toastOption);
      }
      setClick(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!click ? (
        <div className="relative h-screen flex flex-col bg-gray-400">
          <div className="mt-24 font-bold text-[30px] ml-10 p-6 border flex flex-row gap-5 shadow-xl">
            <span>Title: </span>
            <h1 className="text-white">{note.title}</h1>
          </div>
          <div className="ml-10 mt-10 font-bold text-[20px] border text-white shadow-xl h-auto ansolute p-3">
            <p>{note.content}</p>
          </div>
          <div className="flex flex-row">
            <button
              className="ml-10 bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 w-20 mt-10"
              onClick={toggle}
            >
              Update
            </button>
            <Link
              to={`/hero/${note.user}`}
              state={{ users }}
              className="ml-10 w-20 mt-10 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Back
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex h-screen">
            <div className=" mt-32 flex-grow relative mr-10 p-4 mt-24">
              <div className="w-full">
                <form className="border p-4 rounded-lg shadow-md flex flex-col gap-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-bold text-[20px]">Title</span>
                    <input
                      type="text"
                      placeholder="Enter the title"
                      value={Values.title}
                      onChange={(e) => {
                        setValues({ ...Values, title: e.target.value });
                      }}
                      className="outline bg-gray-100 border border-gray-300  rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-bold text-[20px]">Content</span>
                    <textarea
                      type="text"
                      placeholder="Enter the Content"
                      value={Values.content}
                      rows="20"
                      className=" outline bg-gray-100 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
                      onChange={(e) => {
                        setValues({ ...Values, content: e.target.value });
                      }}
                    />
                  </label>
                  <button
                    className="mt-10 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 p-3 w-20"
                    onClick={handelOnUpdate}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Read;
