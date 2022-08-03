import { motion } from "framer-motion";

import { NavLink } from "react-router-dom";

const Landing = () => {
  const bgBanner =
    "https://images.unsplash.com/photo-1531968455001-5c5272a41129?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1206&q=80";

  return (
    <div
      style={{ backgroundImage: `url(${bgBanner})`, backgroundSize: "cover" }}
      className="bg-gray-50 "
    >
      <section className="cover mx-auto text-left px-10 pt-10">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <div className="p-4">
            <motion.h1
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring" }}
              className=" text-5xl md:text-6xl lg:text-7xl font-bold my-10 leading-tight md:leading-relaxed"
            >
              {" "}
              <span className="text-red-500">¡Aprende</span> lo mejor <br />
              sobre platos de comida!
            </motion.h1>
            <p className="text-2xl text-blue-100 font-bold">
              Explore nuestra tienda de recetas y elija el suyo
            </p>
            <button className="px-8 py-3 mt-10 bg-red-500 hover:bg-red-400 rounded hover:bg-red-500 text-white hover:text-white transition duration-300 ">
              <a className="hover:text-white" href="#platos">
                VER PLATOS
              </a>
            </button>
          </div>
          <motion.div
            initial={{ y: "-100vw" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.1 }}
          >
            <img
              className="py-5 lg:py-0"
              src="https://www.samtravelperu.com/wp-content/uploads/2020/12/collage-food-1.png"
              alt=""
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
