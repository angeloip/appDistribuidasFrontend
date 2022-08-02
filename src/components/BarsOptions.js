import styles from "../styles/BarsOptions.module.css";
import { GrClose } from "react-icons/gr";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useData } from "../context/dataContext";
import { useAuth } from "../context/authContext";

export const BarsOptions = ({ showCanvas, setShowCanvas }) => {
  const [beUser, setBeUser] = useAuth().beUser;
  const logOut = useAuth().logOut;
  const setFavorites = useData().favorites[1];

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  const cerrarSesion = async () => {
    /* setLoading(true); */
    await logOut()
      .then((res) => {
        setBeUser(null);
        setFavorites([]);
        Toast.fire({
          icon: "success",
          title: `Ha cerrado sesión`
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    /* setLoading(false); */
  };
  return (
    <>
      <Offcanvas show={showCanvas} onHide={() => setShowCanvas(false)}>
        <Offcanvas.Header>
          <div className={styles.displayHeader}>
            <Offcanvas.Title className={styles.modalTitle}>
              Opciones
            </Offcanvas.Title>
            <button
              className={styles.buttonGl}
              onClick={() => {
                setShowCanvas(false);
              }}
            >
              <GrClose size={20} />
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link
            to="/categorias"
            className={styles.boxCategory}
            onClick={() => setShowCanvas(false)}
          >
            <span>Categorías</span>
            <AiOutlineArrowRight size={18} />
          </Link>

          <Link
            to="/buscar-por-ingredientes"
            className={styles.boxCategory}
            onClick={() => setShowCanvas(false)}
          >
            <span>Buscar por ingredientes</span>
            <AiOutlineArrowRight size={18} />
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
