import { SingleFavorite } from "../components/SingleFavorite";
import { useData } from "../context/dataContext";
import styles from "../styles/Favorites.module.css";
import { GiNestedHearts } from "react-icons/gi";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const [favorites] = useData().favorites;
  return (
    <div className={styles.favoritesContainer}>
      <div className={styles.titleContainer}>
        <h2>Mis Platos Favoritos</h2>
      </div>
      <div className={styles.favoriteBox}>
        <div className={styles.favoritesSubContainer}>
          <div className={styles.favoritesContent}>
            {favorites.length === 0 ? (
              <div className={styles.emptyCarContainer}>
                <div className={styles.emptyCar}>
                  <GiNestedHearts size={50} className={styles.iconHeart} />
                  <h4 className={styles.clean__title}>
                    Tu lista de favoritos está vacío
                  </h4>
                  <p className={styles.clean__paragraph}>
                    Aún no ha elegido un plato favorito
                  </p>
                  <Link to="/" className={styles.btnToShop}>
                    Ir a buscar platos
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {favorites.map((favorite) => (
                  <SingleFavorite key={favorite._id} favorite={favorite} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
