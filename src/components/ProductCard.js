import styles from "../styles/ProductCard.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useAuth } from "../context/authContext";
import { useData } from "../context/dataContext";
import noImg from "../img/no-image-dish.jpg";
import Swal from "sweetalert2";

export const ProductCard = ({ producto }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [beUser] = useAuth().beUser;
  const [favorites] = useData().favorites;
  const addToFavorites = useData().addToFavorites;
  const deleteToFavorites = useData().deleteToFavorites;
  const [isLoadingBtn, setIsLoadingBtn] = useData().isLoadingBtn;

  const [isCheck, setIsCheck] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  const agregarFavorito = async () => {
    if (beUser) {
      setIsLoading(true);
      setIsLoadingBtn(true);

      const tempProduct = {
        dishId: producto._id,
        userId: beUser.id
      };

      await addToFavorites(tempProduct);
      setIsLoading(false);
      setIsLoadingBtn(false);
    } else {
      Toast.fire({
        icon: "info",
        title: "Inicia Sesión para agregar favoritos"
      });
    }
  };

  const eliminarFavorito = async () => {
    setIsLoading(true);
    setIsLoadingBtn(true);
    const deleteFav = favorites.find(
      (favorite) => favorite.dish._id === producto._id
    );

    await deleteToFavorites(deleteFav._id);
    setIsLoading(false);
    setIsLoadingBtn(false);
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
              src={producto.image.url || noImg}
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
              disabled={isLoading || isLoadingBtn}
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
