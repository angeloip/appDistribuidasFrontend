import Landing from "../components/Landing";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";

export const Home = () => {
  /* const [dataDishes] = useData().dataDishes;
  const [isLoadingDishes] = useData().isLoadingDishes; */
  document.title = "IziFood | Home";
  window.scrollTo({ top: 0, behavior: "auto" });
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Landing></Landing>
      <div id="platos" className={styles.homeContainer}>
        <h1 className="py-10 text-center text-4xl font-bold text-gray-700">
          Lista de Platos
        </h1>
        {/* <div className={styles.listaProducts}>
          {isLoadingDishes
            ? [...Array(10)].map((x, i) => <ProductCardSkeleton key={i} />)
            : dataDishes.map((producto) => (
                <ProductCard key={producto._id} producto={producto} />
              ))}
        </div> */}
      </div>
    </motion.div>
  );
};
