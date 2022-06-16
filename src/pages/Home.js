import { useEffect, useState } from "react";
import { getDishesRequest } from "../api/request";
import { getUserRequest } from "../api/userRequest";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/SkeletonMolds";
import { useAuth } from "../context/authContext";
import { useData } from "../context/dataContext";
import styles from "../styles/Home.module.css";

export const Home = () => {
  const [dataDishes, setDataDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useData().favorites;
  const [beUser, setBeUser] = useAuth().beUser;

  const getData = async () => {
    setIsLoading(true);
    await getDishesRequest()
      .then((res) => {
        setDataDishes(res.data);
      })
      .catch((err) => alert(err.response));

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  /*  const getFavoritesUser = async () => {
    setIsLoading(true);
    await getUserRequest(beUser.id)
      .then((res) => {
        setFavorites(res.data.favorites);
      })
      .catch((err) => alert(err.response));
    setIsLoading(false);
  };

  useEffect(() => {
    getFavoritesUser();
  }, []); */

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Lista de Platos</h1>
      <div className={styles.listaProducts}>
        {isLoading
          ? [...Array(10)].map((x, i) => <ProductCardSkeleton key={i} />)
          : dataDishes.map((producto) => (
              <ProductCard key={producto._id} producto={producto} />
            ))}
      </div>
    </div>
  );
};
