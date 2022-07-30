import styles from "../styles/Accordion.module.css";
import { MdOutlineExpandMore } from "react-icons/md";
import { useState, useRef } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useData } from "../context/dataContext";

export const Accordion = ({ setNameCategory }) => {
  const [categories] = useData().categories;
  const [isOpen, setIsOpen] = useState(true);

  const content = useRef(null);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event) => {
    setNameCategory(event.target.value);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.item}>
        <div className={styles.title} onClick={handleOpen}>
          <h2>Categorías ({categories.length})</h2>
          <span>
            <MdOutlineExpandMore
              size={20}
              className={
                isOpen
                  ? `${styles.iconExpand} ${styles.active}`
                  : `${styles.iconExpand}`
              }
            />
          </span>
        </div>

        <div
          ref={content}
          style={{
            maxHeight: isOpen ? `350px` : "0px"
          }}
          className={
            isOpen ? `${styles.content} ${styles.active}` : `${styles.content}`
          }
        >
          <div>
            <div className={styles.radio_group}>
              {categories.map((category) => (
                <label className={styles.radio} key={category._id}>
                  <input
                    type="radio"
                    name="gender"
                    value={category.name}
                    onChange={handleChange}
                  />
                  {category.name}
                  <span></span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
