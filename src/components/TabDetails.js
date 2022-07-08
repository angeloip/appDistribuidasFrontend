import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import styles from "../styles/TabDetails.module.css";

export const TabDetails = ({ dish }) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
          >
            <Tab label="General" value="1" />
            <Tab label="Preparacion" value="2" />
            <Tab label="Beneficios" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
        </TabPanel>
        <TabPanel value="2">
          <div className={styles.preparationBox}>
            <p className={styles.paraphBold}>Preparación:</p>
            <div className={styles.subParaph}>{dish.preparation}</div>
          </div>
        </TabPanel>
        <TabPanel value="3">
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
        </TabPanel>
      </TabContext>
    </Box>
  );
};
