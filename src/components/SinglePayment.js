import styles from "../styles/SinglePayment.module.css";
import { HiOutlineInformationCircle } from "react-icons/hi";
import noImg from "../img/no-image-dish.jpg";
import { Link } from "react-router-dom";

export const SinglePayment = ({ shop }) => {
  return (
    <div className={styles.singlePaymentContent}>
      <div className={styles.singleImg}>
        <img src={shop.dish.image.url || noImg} alt={shop.dish.name} />
      </div>
      <div className={styles.singleName}>
        <span className={styles.category}>{shop.dish.category}</span>
        <span className={styles.name}>{shop.dish.name}</span>
      </div>
      <div className={styles.amount}>
        <span className={styles.title}>Monto</span>
        <span className={styles.total}>$ {shop.amount}</span>
      </div>
      <div className={styles.date}>
        <span className={styles.title}>Fecha</span>
        <span className={styles.datepick}>{shop.date}</span>
      </div>
      <Link to={`/plato/detalles/${shop.dish._id}`} className={styles.btnView}>
        <HiOutlineInformationCircle
          size={20}
          className={styles.iconInformation}
        />
        <span>Ver detalles</span>
      </Link>
    </div>
  );
};
