// import { useState } from "react";
// import { Navbar } from "./component/Navbar";
// import { BrowserRoute, Router, Route } from "react-dom";
import Layout from "./component/Layout";
import Component from "./component/Component";
import Navbar from "./component/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <Component />
      </Layout>
    </>
  );
}

export default App;
