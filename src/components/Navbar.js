import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ModalLogin } from "../modals/ModalLogin";

import styles from "../styles/Navbar.module.css";
import { DropdownUser } from "./DropdownUser";
import { ListCategories } from "./ListCategories";
import { Search } from "./Search";

export const Navbar = () => {
  const [beUser] = useAuth().beUser;
  const [show, setShow] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.subNavbarContainer}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.nameLogo}>IziFood</span>
          </Link>
        </div>

        <div className={styles.searchProductBox}>
          <Search />
        </div>

        <div className={styles.opcionesNavbar}>
          <ul>
            <li>
              <button
                type="button"
                className={styles.buttonNav}
                onClick={() => setShowCanvas(true)}
              >
                Categorías
              </button>
              <ListCategories
                showCanvas={showCanvas}
                setShowCanvas={setShowCanvas}
              />
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
      </div>
    </nav>
  );
};
