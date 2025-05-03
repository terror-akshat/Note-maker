import React, { useContext } from "react";
import { UserContext } from "../ContextApi/UseContext";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Avtar from "./Avtar";

const SideBar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(user.data.status);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div>
        <div className="fixed relative flex justify-center flex-row bg-lime-300 max-w-60 min-h-screen">
          <div className="fixed border-lime-1000 mt-24 p-2 bg-yellow-300 text-white-1000 rounded-xl hover:bg-yellow-100 h-10">
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="fixed flex flex-col items-center mt-36">
            <div className="border bg-gray-300 mt-20 p-20 sm:w-10 sm:h-10 rounded-xl w-5 h-5">
              {/* "ahd" */}
            </div>
            <div className="border-lime-1000 mt-4 p-2 bg-yellow-300 text-white-1000 rounded-xl hover:bg-yellow-100 ">
              <div className="flex justify-center items-center">
                <Popup
                  trigger={<button>Add Image</button>}
                  position="right center"
                >
                  <div className="flex sm:ml-32 sm:mt-72 mt-64">
                    <Avtar />
                  </div>
                </Popup>
              </div>
            </div>
            <div className="mt-16">{}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
