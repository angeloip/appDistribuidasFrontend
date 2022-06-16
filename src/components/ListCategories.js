import styles from "../styles/ListCategories.module.css";
import { GrClose } from "react-icons/gr";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Offcanvas } from "react-bootstrap";

export const ListCategories = ({ showCanvas, setShowCanvas }) => {
  return (
    <>
      <Offcanvas show={showCanvas} onHide={() => setShowCanvas(false)}>
        <Offcanvas.Header>
          <div className={styles.displayHeader}>
            <Offcanvas.Title className={styles.modalTitle}>
              Categorías
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
          <div className={styles.boxCategory}>
            <span>Entrada</span>
            <AiOutlineArrowRight size={18} />
          </div>
          <div className={styles.boxCategory}>
            <span>Sopas</span>
            <AiOutlineArrowRight size={18} />
          </div>
          <div className={styles.boxCategory}>
            <span>Ensaladas</span>
            <AiOutlineArrowRight size={18} />
          </div>
          <div className={styles.boxCategory}>
            <span>Platos de Fondo</span>
            <AiOutlineArrowRight size={18} />
          </div>
          <div className={styles.boxCategory}>
            <span>Postres</span>
            <AiOutlineArrowRight size={18} />
          </div>
          <div className={styles.boxCategory}>
            <span>Bebidas Calientes</span>
            <AiOutlineArrowRight size={18} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
