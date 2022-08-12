import styles from "../styles/Footer.module.css";
import logo from "../img/logo.png";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcDinersClub
} from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: "200px", width: "100%" }}
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "#fff" }}
          ></path>
        </svg>
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.footerSubcontainer}>
          <div className={styles.oneBox}>
            <div className={styles.boxElement}>
              <figure className={styles.figure}>
                <img src={logo} alt="IziFood" />
              </figure>
            </div>
            <div className={styles.boxElement}>
              <h2 className={styles.elementOneBox}>SOBRE NOSOTROS</h2>
              <p className={styles.elementOneBox}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi,
                reiciendis!
              </p>
              <p className={styles.elementOneBox}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptate, quia.
              </p>
            </div>
            <div className={styles.boxElement}>
              <div
                className={`${styles.socialNetworks} ${styles.elementSecondBox}`}
              >
                <h2>SÍGUENOS</h2>
                <div className={styles.links}>
                  <a href="#">
                    <FaFacebookSquare size={40} fill="#5761A6" />
                  </a>
                  <a href="#">
                    <FaInstagramSquare size={40} fill="#E1306C" />
                  </a>
                  <a href="#">
                    <FaTwitterSquare size={40} fill="#6494EB" />
                  </a>
                  <a href="#">
                    <FaYoutubeSquare size={40} fill="#D92424" />
                  </a>
                </div>
              </div>
              <div
                className={`${styles.paymentMethods} ${styles.elementSecondBox}`}
              >
                <h2>MEDIOS DE PAGO</h2>
                <div className={styles.links}>
                  <span href="#">
                    <FaCcVisa size={40} fill="#220073" />
                  </span>
                  <span href="#">
                    <FaCcMastercard size={40} fill="#C46429" />
                  </span>
                  <span href="#">
                    <FaCcAmex size={40} fill="#4C72C2" />
                  </span>
                  <span href="#">
                    <FaCcDiscover size={40} fill="#CE8135" />
                  </span>
                  <span href="#">
                    <FaCcDinersClub size={40} fill="#4B72BA" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.twoBox}>
            <small>
              &copy; 2022 <b>IziFood</b> - Todos los Derechos Reservados
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};
