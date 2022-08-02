import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ModalLogin } from "../modals/ModalLogin";

import styles from "../styles/Navbar.module.css";
import { DropdownUser } from "./DropdownUser";
import { Search } from "./Search";
import { FaBars } from "react-icons/fa";
import { BarsOptions } from "./BarsOptions";

export const Navbar = () => {
  const [beUser] = useAuth().beUser;
  const [show, setShow] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.subNavbarContainer}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className={styles.searchProductBox}>
          <Search />
        </div>

        <div className={styles.opcionesNavbar}>
          <ul>
            <li>
              <Link to="/categorias" className={styles.buttonNav}>
                Categorías
              </Link>
            </li>

            <li>
              <Link
                className={`${styles.buttonNav} ${styles.linkNav}`}
                to="/buscar-por-ingredientes"
              >
                Buscar por ingredientes
              </Link>
            </li>

            <li>
              {beUser ? (
                <DropdownUser />
              ) : (
                <button
                  className={styles.loginBtn}
                  onClick={() => setShow(true)}
                >
                  Ingresar
                </button>
              )}
            </li>
            <ModalLogin show={show} setShow={setShow} />
          </ul>
        </div>

        <div className={styles.barContent}>
          <button /* onClick={() => setShowCanvas(true)} */>
            <FaBars size={20} fill={"#f24726"} />
          </button>
          <BarsOptions showCanvas={showCanvas} setShowCanvas={setShowCanvas} />
        </div>
      </div>
    </nav>
  );
};
