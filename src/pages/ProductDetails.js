import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineDollar } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import styles from "../styles/ProductDetails.module.css";
import { useData } from "../context/dataContext";
import { useAuth } from "../context/authContext";
import noImg from "../img/no-image-dish.jpg";
import { DetailsProductSkeleton } from "../components/SkeletonMolds";
import { useApi } from "../context/apiContext";
import { TabDetails } from "../components/TabDetails";
import Swal from "sweetalert2";
import { ModalPay } from "../modals/ModalPay";

export const ProductDetails = () => {
  const [productoDetalles, setProductoDetalles] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [favorites] = useData().favorites;
  const [shopping] = useData().shopping;
  const addToFavorites = useData().addToFavorites;
  const deleteToFavorites = useData().deleteToFavorites;
  const [beUser] = useAuth().beUser;
  const [isCheck, setIsCheck] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const params = useParams();
  const getDishRequest = useApi().getDishRequest;
  const navigate = useNavigate();

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

  const comprarProducto = async () => {
    if (beUser) {
      setShow(true);
    } else {
      Toast.fire({
        icon: "info",
        title: "Inicia Sesión para realizar una compra"
      });
    }
  };

  const verEstado = async () => {};

  const getDish = async () => {
    setIsLoading(true);

    await getDishRequest(params.id)
      .then((res) => {
        setProductoDetalles(res.data);
        document.title = res.data.name;
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 500 || 404) {
          navigate("*");
        }
      });
  };

  const checkFavorite = () => {
    if (favorites.length > 0) {
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].dish._id === params.id) {
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

  const checkPayment = () => {
    if (shopping.length > 0) {
      for (let i = 0; i < shopping.length; i++) {
        if (shopping[i].dish._id === params.id) {
          setIsBuy(true);

          i = shopping.length;
        } else {
          setIsBuy(false);
        }
      }
    } else {
      setIsBuy(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 /* , behavior: "smooth"  */ });

    getDish();
  }, [params.id]);

  useEffect(() => {
    checkFavorite();
  }, [favorites]);
  useEffect(() => {
    checkPayment();
  }, [shopping]);

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
                  src={productoDetalles.image?.url || noImg}
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
                          <span className={styles.textIcon}>
                            Eliminar de favoritos
                          </span>
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
                          <span className={styles.textIcon}>
                            Agregar a favoritos
                          </span>
                        </>
                      )}
                    </>
                  )}
                </button>
                <button
                  className={
                    isBuy
                      ? `${styles.viewBtn} ${styles.trsBtn}`
                      : `${styles.buyBtn} ${styles.trsBtn}`
                  }
                  type="button"
                  disabled={isBtnLoading}
                  onClick={isBuy ? () => verEstado() : () => comprarProducto()}
                >
                  {isBuy ? (
                    <>
                      {" "}
                      <BsCartCheck size={20} className={styles.iconCart} />
                      <span className={styles.textIcon}>Comprado</span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <AiOutlineDollar size={20} className={styles.iconBuy} />
                      <span className={styles.textIcon}>Comprar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <ModalPay show={show} setShow={setShow} dish={productoDetalles} />
        </>
      )}
    </>
  );
};
