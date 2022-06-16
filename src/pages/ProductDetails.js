import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDishRequest } from "../api/request";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import styles from "../styles/ProductDetails.module.css";
import { useData } from "../context/dataContext";
import { useAuth } from "../context/authContext";
import { DetailsProductSkeleton } from "../components/SkeletonMolds";

export const ProductDetails = () => {
  const [productoDetalles, setProductoDetalles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [favorites, setFavorites] = useData().favorites;
  const addToFavorites = useData().addToFavorites;
  const deleteToFavorites = useData().deleteToFavorites;
  const [beUser, setBeUser] = useAuth().beUser;
  const [isCheck, setIsCheck] = useState(false);
  const params = useParams();

  const agregarFavorito = async () => {
    setIsBtnLoading(true);

    const tempProduct = {
      dishId: productoDetalles._id,
      userId: beUser.id
    };

    await addToFavorites(tempProduct);
    setIsBtnLoading(false);
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
      .then((res) => {
        setProductoDetalles(res.data);
      })
      .catch((err) => alert(err.response));

    setIsLoading(false);
  };
  const checkFavorite = () => {
    if (favorites.length > 0) {
      for (let i = 0; i < favorites.length; i++) {
        console.log(favorites[i]?.dish._id, params.id);
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
  }, []);

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
              <div className={styles.firstDetalles}>
                <span className={styles.categoria}>
                  {productoDetalles.category}
                </span>
                <h4 className={styles.detalles_title}>
                  {productoDetalles.name}
                </h4>
              </div>
              <div>
                <p className={styles.paraphBold}>Ingredientes:</p>
                <div className={styles.short_description}>
                  <ul>
                    {productoDetalles.ingredients?.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <p className={styles.paraphBold}>Preparación:</p>
                <div className={styles.subParaph}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatum illum dolores saepe cumque quisquam qui omnis in
                  voluptate ea ipsa.
                </div>
              </div>
              <div>
                <p className={styles.paraphBold}>Beneficios:</p>
                <div className={styles.subParaph}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatum illum dolores saepe cumque quisquam qui omnis in
                  voluptate ea ipsa.
                </div>
              </div>
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
      )}
    </>
  );
};
