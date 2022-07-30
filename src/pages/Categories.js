import styles from "../styles/Categories.module.css";
import { Accordion } from "../components/Accordion";
import { ProductCardSkeleton } from "../components/SkeletonMolds";
import { useState } from "react";

export const Categories = () => {
  const [nameCategory, setNameCategory] = useState("Categoría");
  return (
    <div className={styles.categoriesBox}>
      <figure className={styles.figureCategorie}>
        <h2>{nameCategory}</h2>
      </figure>
      <div className={styles.categoriesContainer}>
        <div className={styles.subCategoriesContainer}>
          <div className={styles.categoryFilters}>
            <h2 className={styles.boxTittle}>Filtros</h2>
            <Accordion
              nameCategory={nameCategory}
              setNameCategory={setNameCategory}
            />
          </div>

          <div className={styles.results}>
            {[...Array(10)].map((x, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
