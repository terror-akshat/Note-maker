import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { useContext } from "react";
import { UserContext } from "../ContextApi/UseContext";
import { toast, ToastContainer } from "react-toastify";
import "../styles";
import { useEffect } from "react";
// import Avtar from "./Avtar";

const Hero = () => {
  const { id } = useParams();
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [users, SetUser] = useState(null);

  const [Notes, setNotes] = useState({
    title: "",
    content: "",
  });

  const handelOnAdd = async (e) => {
    e.preventDefault();
    try {
      const { title, content } = Notes;
      const response = await axios.post(`/add-note/${id}`, {
        title,
        content,
      });
      if (response.data.status === false) {
        toast.error(response.data.msg, toastOption);
      }
      if (response.data.status === true) {
        toast.success(response.data.msg, toastOption);
      }
      setNotes({ title: " ", content: " " });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async (id) => {
      try {
        const res = await axios.get(`/get-user/${id}`);
        // console.log(res.data);
        if (res.data.status === false) {
          console.log(res.data.msg);
        }
        if (res.data.status === true) {
          SetUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser(id);
  }, []);

  // useEffect(() => {
  //   const getImage = async (id) => {
  //     try {
  //       const res = await axios.get(`/image/${id}`);
  //       if (res.data.status === false) {
  //         console.log(res.data.msg);
  //       }
  //       if (res.data.status === true) {
  //         setImage(res.data.images);
  //         console.log(res.data.images);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getImage(id);
  // }, []);

  const handleOnDelete = async (userid) => {
    // e.preventDefault();
    try {
      const response = await axios.delete(`/delete/${userid}`);
      console.log(response);

      if (response.data.status === false) {
        toast.error(response.data.msg, toastOption);
      }
      if (response.data.status === true) {
        toast.success(response.data.msg, toastOption);
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
      {users ? (
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <div className="right-0 mr-10 absolute mt-20">
            <span className="mr-10 text-[25px] font-bold underline italic">
              {users.username}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
            >
              Logout
            </button>
          </div>
          <div className="flex h-screen">
            <div className=" mt-32 flex-grow relative mr-10 p-4 mt-24">
              <div className="w-full">
                <form className="border p-4 rounded-lg shadow-md flex flex-col gap-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-bold text-[20px]">Title</span>
                    <input
                      type="text"
                      placeholder="Enter the title"
                      value={Notes.title}
                      onChange={(e) => {
                        setNotes({ ...Notes, title: e.target.value });
                      }}
                      className="outline bg-gray-100 border border-gray-300  rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-bold text-[20px]">Content</span>

                    <textarea
                      type="text"
                      placeholder="Enter the Content"
                      value={Notes.content}
                      rows="20"
                      className=" outline bg-gray-100 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
                      onChange={(e) => {
                        setNotes({ ...Notes, content: e.target.value });
                      }}
                    />
                  </label>
                  <button
                    className="mt-10 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 p-3 w-20"
                    onClick={handelOnAdd}
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* <div className="flex justify-center flex-col items-center">
            <h2 className=" font-bold text-[30px]">Image Section</h2>
            <Avtar id={id} />
          </div> */}
          <ToastContainer />
          {/* list */}
          <div className="mt-10 border flex flex-row">
            <div className="overflow-y-auto h-[300px] w-full border p-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-bold text-[30px] text-left">Notes</th>
                    <th className="font-bold text-[30px] text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.notes.map((use) => (
                    <tr key={use._id} className="border-b">
                      <td className="font-bold text-[20px]">{use.title}</td>
                      <td className="space-x-2">
                        <Link
                          to={`/read/${use._id}`}
                          state={{ users }}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                          Read
                        </Link>

                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          onClick={() => handleOnDelete(use._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h2>loadig</h2>
      )}
    </>
  );
};
export default Hero;
