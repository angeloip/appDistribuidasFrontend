import styles from "../styles/ProductCard.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useAuth } from "../context/authContext";
import { useData } from "../context/dataContext";

export const ProductCard = ({ producto }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [beUser, setBeUser] = useAuth().beUser;
  const [favorites, setFavorites] = useData().favorites;
  const addToFavorites = useData().addToFavorites;
  const deleteToFavorites = useData().deleteToFavorites;

  const [isCheck, setIsCheck] = useState(false);

  const agregarFavorito = async () => {
    setIsLoading(true);

    const tempProduct = {
      dishId: producto._id,
      userId: beUser.id
    };

    await addToFavorites(tempProduct);
    setIsLoading(false);
  };

  const eliminarFavorito = async () => {
    setIsLoading(true);
    const deleteFav = favorites.find(
      (favorite) => favorite.dish._id === producto._id
    );

    await deleteToFavorites(deleteFav._id);
    setIsLoading(false);
  };

  const checkFavorite = () => {
    if (favorites.length > 0) {
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].dish._id === producto._id) {
          setIsCheck(true);
          i = favorites.length;
        } else {
          setIsCheck(false);
        }
      }
    } else {
      setIsCheck(false);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, [favorites]);

  return (
    <div className={styles.productoCardContainer}>
      <div className={styles.subproductoCardContainer}>
        <div>
          <div className={styles.imgProductoCard}>
            <img
              className={styles.photoProduct}
              src={producto.image.url}
              alt={producto.name}
            />
          </div>

          <div>
            <div className={styles.nameBox}>
              <span className={styles.productName}>{producto.name}</span>
            </div>

            <p className={styles.productCategory}>{producto.category}</p>
            <button
              className={styles.favoriteBtn}
              type="button"
              disabled={isLoading}
              onClick={
                isCheck ? () => eliminarFavorito() : () => agregarFavorito()
              }
            >
              {isCheck ? (
                <>
                  {isLoading ? (
                    <ImSpinner9 className={styles.spinner} size={20} />
                  ) : (
                    <>
                      {" "}
                      <AiFillHeart size={20} className={styles.iconHeart} />
                      <span>Eliminar de favoritos</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  {isLoading ? (
                    <ImSpinner9 className={styles.spinner} size={20} />
                  ) : (
                    <>
                      {" "}
                      <AiOutlineHeart size={20} className={styles.iconHeart} />
                      <span>Agregar a favoritos</span>
                    </>
                  )}
                </>
              )}
            </button>

            <div className={styles.detailsBox}>
              <Link
                to={`/plato/detalles/${producto._id}`}
                className={styles.detailsLink}
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
