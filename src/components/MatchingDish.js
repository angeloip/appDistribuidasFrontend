import styles from "../styles/MatchingDish.module.css";
import { Link } from "react-router-dom";
import { HiOutlineInformationCircle } from "react-icons/hi";

export const MatchingDish = ({ dish }) => {
  return (
    <div className={styles.matchingDishContainer}>
      <div className={styles.subMatchingDishContainer}>
        <div className={styles.singleImg}>
          <img src={dish.image.url} alt={dish.name} />
        </div>
        <div className={styles.singleName}>
          <span className={styles.category}>{dish.category}</span>
          <span className={styles.name}>{dish.name}</span>
        </div>
        <div className={styles.listIngredients}>
          <ul>
            {dish.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className={styles.preparation}>
          <span className={styles.titlePreparation}>Preparacion:</span>
          <span className={styles.textPreparation}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur, dolores.
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
