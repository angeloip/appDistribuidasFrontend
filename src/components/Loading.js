import React from "react";

import styles from "../styles/Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img src={process.env.PUBLIC_URL + "logoLoading.png"} alt="IziFood" />
      <h3>Cargando . . .</h3>
    </div>
  );
};
