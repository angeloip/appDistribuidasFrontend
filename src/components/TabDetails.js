import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "../styles/TabDetails.module.css";

export const TabDetails = ({ dish }) => {
  return (
    <Tabs
      defaultActiveKey="general"
      id="fill-tab-example"
      className={`mb-3 ${styles.tabsContainer}`}
      fill
    >
      <Tab eventKey="general" title="General" className={styles.tabElement}>
        <div className={styles.ingredientsBox}>
          <div className={styles.firstDetalles}>
            <span className={styles.categoria}>{dish.category}</span>
            <h4 className={styles.detalles_title}>{dish.name}</h4>
          </div>
          <div>
            <p className={styles.paraphBold}>Ingredientes:</p>
            <div className={styles.short_description}>
              <ul>
                {dish.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Tab>
      <Tab
        eventKey="preparation"
        title="Preparación"
        className={styles.tabElement}
      >
        <div className={styles.preparationBox}>
          <p className={styles.paraphBold}>Preparación:</p>
          <div className={styles.subParaph}>{dish.preparation}</div>
        </div>
      </Tab>
      <Tab eventKey="benefits" title="Beneficios" className={styles.tabElement}>
        <div className={styles.benefitsBox}>
          <p className={styles.paraphBold}>Beneficios:</p>

          <div className={styles.subParaph}>
            <ul>
              {dish.benefits?.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};
