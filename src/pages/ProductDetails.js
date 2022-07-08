import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import styles from "../styles/ProductDetails.module.css";
import { useData } from "../context/dataContext";
import { useAuth } from "../context/authContext";
import { DetailsProductSkeleton } from "../components/SkeletonMolds";
import { useApi } from "../context/apiContext";
import { TabDetails } from "../components/TabDetails";
import Swal from "sweetalert2";
import { Test } from "../components/Test";

export const ProductDetails = () => {
  const [productoDetalles, setProductoDetalles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [favorites] = useData().favorites;
  const addToFavorites = useData().addToFavorites;
  const deleteToFavorites = useData().deleteToFavorites;
  const [beUser] = useAuth().beUser;
  const [isCheck, setIsCheck] = useState(false);
  const params = useParams();
  const [dataDishes] = useData().dataDishes;
  const getDishRequest = useApi().getDishRequest;

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
      setIsBtnLoading(true);

      const tempProduct = {
        dishId: productoDetalles._id,
        userId: beUser.id
      };

      await addToFavorites(tempProduct);
      setIsBtnLoading(false);
    } else {
      Toast.fire({
        icon: "info",
        title: "Inicia Sesión para agregar favoritos"
      });
    }
  };

  const eliminarFavorito = async () => {
    setIsBtnLoading(true);
    const deleteFav = favorites.find(
      (favorite) => favorite.dish._id === params.id
    );
    await deleteToFavorites(deleteFav._id);
    setIsBtnLoading(false);
  };

  const getDish = async () => {
    setIsLoading(true);
    await getDishRequest(params.id)
      .then((res) => setProductoDetalles(res.data))
      .catch((err) => {
        alert(err.response);
        console.log(err.response);
      });
    setIsLoading(false);
  };

  const checkFavorite = () => {
    if (favorites.length > 0) {
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i]?.dish._id === params.id) {
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
    window.scrollTo({ top: 0 /* , behavior: "smooth"  */ });
    getDish();
  }, [params.id]);

  useEffect(() => {
    checkFavorite();
  }, [favorites]);

  return (
    <>
      {isLoading ? (
        <>
          <DetailsProductSkeleton />
        </>
      ) : (
        <>
          <div className={styles.DetallesProductoContainer}>
            <div className={styles.detallesSubContainer}>
              <div className={styles.detallesPhotoProduct}>
                <img
                  className={styles.photoDetalles}
                  src={productoDetalles.image?.url}
                  alt={productoDetalles.name}
                />
              </div>
              <div className={styles.detallesInfoproduct}>
                <TabDetails dish={productoDetalles} />
                <button
                  className={styles.favoriteBtn}
                  type="button"
                  disabled={isBtnLoading}
                  onClick={
                    isCheck ? () => eliminarFavorito() : () => agregarFavorito()
                  }
                >
                  {isCheck ? (
                    <>
                      {isBtnLoading ? (
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
                      {isBtnLoading ? (
                        <ImSpinner9 className={styles.spinner} size={20} />
                      ) : (
                        <>
                          {" "}
                          <AiOutlineHeart
                            size={20}
                            className={styles.iconHeart}
                          />
                          <span>Agregar a favoritos</span>
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
