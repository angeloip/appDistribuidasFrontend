import styles from "../styles/SingleFavorite.module.css";
import { AiFillHeart } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { ImSpinner9 } from "react-icons/im";
import noImg from "../img/no-image-dish.png";
import { Link } from "react-router-dom";
import { useData } from "../context/dataContext";
import { useState } from "react";

export const SingleFavorite = ({ favorite }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteToFavorites } = useData();

  const eliminarFavorito = async () => {
    setIsLoading(true);
    await deleteToFavorites(favorite._id);
    setIsLoading(false);
  };

  return (
    <div className={styles.singleFavoriteContent}>
      <div className={styles.singleImg}>
        <img
          src={favorite.dish.image.url || noImg}
          alt={favorite.dish.name}
          loading="lazy"
        />
      </div>
      <div className={styles.singleName}>
        <span className={styles.category}>{favorite.dish.category}</span>
        <span className={styles.name}>{favorite.dish.name}</span>
      </div>
      <div className={styles.listIngredients}>
        <span className={styles.titleIngredients}>Ingredientes:</span>
        <span className={styles.textIngredients}>
          {favorite.dish.ingredients.join(", ").slice(0, 80) + "..."}
        </span>
      </div>
      <Link
        to={`/plato/detalles/${favorite.dish._id}`}
        className={styles.btnView}
      >
        <HiOutlineInformationCircle
          size={20}
          className={styles.iconInformation}
        />
        <span>Saber más...</span>
      </Link>

      <button
        className={styles.favoriteBtn}
        disabled={isLoading}
        onClick={() => eliminarFavorito()}
      >
        {isLoading ? (
          <ImSpinner9 className={styles.spinner} size={20} />
        ) : (
          <>
            {" "}
            <AiFillHeart size={20} className={styles.iconHeart} />
            <span>Eliminar de favoritos</span>
          </>
        )}
      </button>
    </div>
  );
};
