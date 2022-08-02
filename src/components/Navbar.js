import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ModalLogin } from "../modals/ModalLogin";

import styles from "../styles/Navbar.module.css";
import { DropdownUser } from "./DropdownUser";
import { Search } from "./Search";
import { FaBars, FaRegUser, FaSearch } from "react-icons/fa";
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

        <div className={styles.iconsContent}>
          <div className={styles.iconBox}>
            <button
              className={styles.btnIcons}
              onClick={() => setShowCanvas(true)}
            >
              <FaBars />
            </button>
            <BarsOptions
              showCanvas={showCanvas}
              setShowCanvas={setShowCanvas}
            />
          </div>

          <div className={`${styles.iconBox} ${styles.searchBox}`}>
            <button className={styles.btnIcons}>
              <FaSearch />
            </button>
          </div>
          <div className={beUser ? "" : styles.iconBox}>
            {beUser ? (
              <DropdownUser />
            ) : (
              <button className={styles.btnIcons} onClick={() => setShow(true)}>
                <FaRegUser />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
