import styles from "../styles/MatchingDish.module.css";
import { Link } from "react-router-dom";
import noImg from "../img/no-image-dish.png";
import { HiOutlineInformationCircle } from "react-icons/hi";

export const MatchingDish = ({ dish }) => {
  return (
    <div className={styles.matchingDishContainer}>
      <div className={styles.subMatchingDishContainer}>
        <div className={styles.singleImg}>
          <img src={dish.image.url || noImg} alt={dish.name} />
        </div>
        <div className={styles.singleName}>
          <span className={styles.category}>{dish.category}</span>
          <span className={styles.name}>{dish.name}</span>
        </div>
        <div className={styles.listIngredients}>
          <span className={styles.titleIngredients}>Ingredientes:</span>
          <span className={styles.textIngredients}>
            {dish.ingredients.join(", ").slice(0, 80) + "..."}
          </span>
        </div>
        <div className={styles.preparation}>
          <span className={styles.titlePreparation}>Preparacion:</span>
          <span className={styles.textPreparation}>
            {dish.preparation.slice(0, 80) + "..."}
          </span>
        </div>
        <Link to={`/plato/detalles/${dish._id}`} className={styles.btnView}>
          <HiOutlineInformationCircle
            size={20}
            className={styles.iconInformation}
          />
          <span>Saber más...</span>
        </Link>
      </div>
    </div>
  );
};
