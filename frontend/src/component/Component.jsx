import React, { useContext, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Register } from "../Page/Register";
import Login from "../Page/Login";
import Hero from "../Page/Hero";
import Avtar from "../Page/Avtar";
import Read from "../Page/Read";
// import { UserContext } from "../ContextApi/UseContext";

const Component = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Register />}></Route>
      <Route path="/Avtar" element={<Avtar />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/Read/:id" element={<Read />}></Route>
      <Route
        path="/hero/:id"
        element={
          <ProtectedPage>
            <Hero />
          </ProtectedPage>
        }
      ></Route>
    </Routes>
  );
};

const ProtectedPage = ({ children }) => {
  // const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let userToken;
  userToken = localStorage.getItem("user");
  console.log(userToken.data);
  // useEffect(() => {
  //   if (userToken) {
  //     navigate(`/hero/${userToken.data.user._id}`);
  //   } else {
  //     navigate("/login");
  //   }
  // }, [navigate, userToken]);
  return userToken ? children : <Navigate to="/login" />;
};

export default Component;
