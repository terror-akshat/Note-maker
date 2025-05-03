import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
const Navbar = () => {
  return (
    <nav className="fixed z-10 top-0 w-full bg-gray-1000 shadow-lg h-20 backdrop-opacity-40 backdrop-invert bg-white/50">
      <motion.div variants={textVariant(0.3)} initial="hidden" animate="show">
        <h2 className={"text-black text-[30px] ml-3 mt-3 italic flex"}>Note maker</h2>
      </motion.div>
    </nav>
  );
};
export default Navbar;
