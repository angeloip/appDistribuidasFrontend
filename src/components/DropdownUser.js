import nophoto from "../nophoto.jpeg";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { useAuth } from "../context/authContext";
import styles from "../styles/DropdownUser.module.css";
import { useEffect, useRef, useState } from "react";
import { useData } from "../context/dataContext";

export const DropdownUser = () => {
  const [beUser, setBeUser] = useAuth().beUser;
  const logOut = useAuth().logOut;
  const setFavorites = useData().favorites[1];

  const [activeDrop, setActiveDrop] = useState(false);
  const ref = useRef();

  const classMenu = activeDrop
    ? `${styles.select_menu} ${styles.active}`
    : styles.select_menu;

  const cerrarSesion = async () => {
    /* setLoading(true); */
    await logOut()
      .then((res) => {
        console.log("Ha cerrado sesión");
        setBeUser(null);
        setFavorites([]);
      })
      .catch((error) => {
        console.log(error);
      });
    /* setLoading(false); */
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (activeDrop && ref.current && !ref.current.contains(e.target)) {
        setActiveDrop(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [activeDrop]);

  return (
    <>
      <div className={classMenu} ref={ref}>
        <button
          className={`${styles.buttonNav}`}
          onClick={() => setActiveDrop(!activeDrop)}
        >
          <img className={styles.photoUser} src={nophoto} alt="" />
        </button>

        <div className={styles.dropdownContent}>
          <div className={`${styles.dropData}`}>
            <img
              className={`${styles.photoUser} ${styles.photoDrop}`}
              src={nophoto}
              alt=""
            />
            <p className={styles.paragraphName}>
              <b>{beUser.name || beUser.email}</b>
            </p>
          </div>

          <div className={styles.separator}></div>

          <ul className={styles.options}>
            <li onClick={() => setActiveDrop(false)}>
              <Link className={styles.option} to="mis-favoritos">
                <div className={styles.elementDrop}>
                  <div className={styles.iconDropDown}>
                    <AiOutlineHeart size={20} />
                  </div>

                  <span>Mis Favoritos</span>
                </div>
              </Link>
            </li>

            <li onClick={() => setActiveDrop(false)}>
              <div className={styles.option} onClick={() => cerrarSesion()}>
                <div className={styles.elementDrop}>
                  <div className={styles.iconDropDown}>
                    <BiLogOut size={20} />
                  </div>

                  <span>Cerrar Sesión</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
