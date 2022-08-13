import styles from "../styles/BarsOptions.module.css";
import { GrClose } from "react-icons/gr";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

export const BarsOptions = ({ showCanvas, setShowCanvas }) => {
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
              <GrClose size={20} className={styles.iconClose} />
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
