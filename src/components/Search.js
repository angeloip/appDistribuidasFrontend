import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";
import styles from "../styles/Search.module.css";

export const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <form action="" className={styles.formulario}>
        <div className={styles.cont_input}>
          <input
            type="search"
            name="producto"
            id="producto"
            placeholder=" "
            autoComplete="off"
            disabled={isLoading}
            className={`${styles.form__input} ${styles.inputPass}`}
          />
          <label className={styles.form__label} htmlFor="producto">
            Buscar plato
          </label>
        </div>
        <button
          type="button"
          className={styles.btnSubmitForm}
          /* onClick={() => setError("")} */
        >
          {isLoading ? (
            <ImSpinner9 size={20} className={styles.iconLoading} />
          ) : (
            <BiSearchAlt size={20} className={styles.eye} />
          )}
        </button>
      </form>
    </>
  );
};
