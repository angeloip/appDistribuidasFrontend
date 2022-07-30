import { Modal } from "react-bootstrap";
import styles from "../styles/ModalPay.module.css";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import noImg from "../img/no-image-dish.jpg";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Spinner from "../components/Spinner";
import { useApi } from "../context/apiContext";
import { useAuth } from "../context/authContext";
import { useData } from "../context/dataContext";

const stripePromise = loadStripe(
  "pk_test_51LOPzIIXUY55H6B6UqZXvybDSESQT6U93ym3sbpIinLSqTnmFIqPHVKsBKioqACOjcETol1egbSNWimEM43K5KHF00EdRrXwkc"
);

const Checkout = ({ isLoading, setIsLoading, dish, setShow }) => {
  const createPaymentRequest = useApi().createPaymentRequest;
  const [shopping, setShopping] = useData().shopping;
  const [isError, setIsError] = useState("");
  const [beUser] = useAuth().beUser;
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const now = new Date();
      const fecha =
        ("0" + now.getDate()).slice(-2) +
        "/" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "/" +
        now.getFullYear();
      const hora =
        now.getHours() +
        ":" +
        ("0" + now.getMinutes()).slice(-2) +
        ":" +
        ("0" + now.getSeconds()).slice(-2);
      const datetime = fecha + " " + hora;

      const { id } = paymentMethod;
      const paymentDetails = {
        id_payment: id,
        amount: 350,
        date: datetime,
        user: beUser.id,
        dish: dish._id
      };

      await createPaymentRequest(paymentDetails)
        .then((res) => {
          setShopping([...shopping, res.data]);
          setIsError("");
          setShow(false);
          Swal.fire(
            "Compra exitosa",
            `El plato ${dish.name} ha sido agregado a su lista de compras`,
            "success"
          );
        })
        .catch((err) => {
          setIsError(err.response.data.message);
        });
    } else {
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className={`w-full px-3 py-2 rounded-lg shadow-sm bg-slate-100 ${styles.cardElement}`}
      />
      {isError && (
        <div className="mt-9 text-red-500 py-3 rounded-md bg-red-100 text-center">
          <h2> {isError} </h2>
        </div>
      )}

      <button className={styles.btnSubmit}>
        {isLoading ? (
          <>
            <Spinner size={20} color={"#fff"} />
            Procesando...
          </>
        ) : (
          "Comprar"
        )}
      </button>
    </form>
  );
};

export const ModalPay = ({ show, setShow, dish }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header>
        <div className={`container ${styles.displayHeader}`}>
          <Modal.Title className={styles.modalTitle}>
            Proceso de Compra
          </Modal.Title>
          <button
            className={styles.buttonGl}
            onClick={() => {
              setShow(false);
            }}
            disabled={isLoading}
          >
            <GrClose size={20} className={styles.iconClose} />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className={`container ${styles.containerForm}`}>
          <div className={styles.img_box}>
            <img
              src={dish.image?.url || noImg}
              alt={dish.name}
              className={styles.payImg}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span>Nombre: {dish.name}</span>
            <span>Categoría: {dish.category}</span>
            <span>Monto: $3.50</span>
          </div>

          <Elements stripe={stripePromise}>
            <Checkout
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              dish={dish}
              setShow={setShow}
            />
          </Elements>
        </div>
      </Modal.Body>
    </Modal>
  );
};
