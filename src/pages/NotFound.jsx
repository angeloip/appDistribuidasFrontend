import styles from "../styles/NotFound.module.css";
import { Link } from "react-router-dom";
import notFoundImage from "../img/not-found-icon.png";
import { HiHome } from "react-icons/hi";

export const NotFound = () => {
  document.title = "Página no encontrada";
  window.scrollTo({ top: 0, behavior: "auto" });
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundSubContainer}>
        <div className={styles.hexagonContent}>
          <div className={styles.hexagonContainer}>
            <div className={styles.content}>
              <figure className={styles.figure}>
                <img src={notFoundImage} alt="Not found - Error 404" />
              </figure>
              <div className={styles.text}>Página no encontrada</div>
              <Link to="/" className={styles.button}>
                <HiHome className={styles.iconHome} size={30} />
                <span className={styles.btnText}>Ir a la página principal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
