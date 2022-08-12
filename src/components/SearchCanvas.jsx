import { Offcanvas } from "react-bootstrap";
import { Search } from "./Search";
import { GrClose } from "react-icons/gr";
import styles from "../styles/SearchCanvas.module.css";

export const SearchCanvas = ({ show, setShow }) => {
  return (
    <>
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        className={styles.searchCanvasContainer}
      >
        <Offcanvas.Header>
          <div className={styles.displayHeader}>
            <Offcanvas.Title className={styles.modalTitle}>
              Buscar Plato
            </Offcanvas.Title>
            <button
              className={styles.buttonGl}
              onClick={() => {
                setShow(false);
              }}
            >
              <GrClose size={20} className={styles.iconClose} />
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Search width={"100%"} setShow={setShow} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
