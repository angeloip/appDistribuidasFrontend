import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/SkeletonMolds";

import { useData } from "../context/dataContext";
import styles from "../styles/Home.module.css";

export const Home = () => {
  const [dataDishes, setDataDishes] = useData().dataDishes;
  const [isLoadingDishes, setIsLoadingDishes] = useData().isLoadingDishes;

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Lista de Platos</h1>
      <div className={styles.listaProducts}>
        {isLoadingDishes
          ? [...Array(10)].map((x, i) => <ProductCardSkeleton key={i} />)
          : dataDishes.map((producto) => (
              <ProductCard key={producto._id} producto={producto} />
            ))}
      </div>
    </div>
  );
};
