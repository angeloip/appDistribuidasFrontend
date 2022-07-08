import styles from "../styles/Test.module.css";

export const Test = () => {
  const li = document.querySelectorAll(`.${styles.li}`);
  const bloque = document.querySelectorAll(`.${styles.bloque}`);

  li.forEach((cadaLi, i) => {
    li[i].addEventListener("click", () => {
      li.forEach((cadaLi, i) => {
        li[i].classList.remove(`${styles.active}`);
        bloque[i].classList.remove(`${styles.active}`);
      });

      li[i].classList.add(`${styles.active}`);
      bloque[i].classList.add(`${styles.active}`);
    });
  });
  return (
    <div className={styles.tabContainer}>
      <ul className={styles.ul}>
        <li className={`${styles.li} ${styles.active}`}>General</li>
        <li className={styles.li}>Preparación</li>
        <li className={styles.li}>Beneficios</li>
      </ul>

      <div className={styles.contentContainer}>
        <div className={`${styles.bloque} ${styles.active}`}>BLOQUE 1</div>
        <div className={styles.bloque}>BLOQUE 2</div>
        <div className={styles.bloque}>BLOQUE 3</div>
      </div>
    </div>
  );
};
