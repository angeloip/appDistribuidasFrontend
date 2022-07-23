import { SinglePayment } from "../components/SinglePayment";
import { BsCart4 } from "react-icons/bs";
import styles from "../styles/Payments.module.css";
import { Link } from "react-router-dom";
import { useData } from "../context/dataContext";

export const Payments = () => {
  const [shopping] = useData().shopping;
  return (
    <div className={styles.paymentsContainer}>
      <div className={styles.titleContainer}>
        <h2>Mis Compras</h2>
      </div>
      <div className={styles.paymentsBox}>
        <div className={styles.paymentsSubContainer}>
          <div className={styles.paymentsContent}>
            {shopping.length === 0 ? (
              <div className={styles.emptyCarContainer}>
                <div className={styles.emptyCar}>
                  <BsCart4 size={50} className={styles.iconHeart} />
                  <h3 className={styles.clean__title}>
                    Tu lista de compras está vacío
                  </h3>
                  <p className={styles.clean__paragraph}>
                    Aún no ha realizado una compra
                  </p>
                  <Link to="/" className={styles.btnToDish}>
                    Ir a comprar
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {shopping.map((shop) => (
                  <SinglePayment key={shop._id} shop={shop} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
