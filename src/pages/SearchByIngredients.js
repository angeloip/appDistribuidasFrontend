import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { MatchingDish } from "../components/MatchingDish";
import { useData } from "../context/dataContext";
import { BiDish } from "react-icons/bi";
import { MdSearchOff } from "react-icons/md";
import styles from "../styles/SearchByIngredients.module.css";

export const SearchByIngredients = () => {
  const [listIngredients] = useData().listIngredients;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dataDishes] = useData().dataDishes;
  const [matchingDishes, setMatchingDishes] = useState(null);

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

  const handleSelect = () => {
    if (selectedOptions.length < 2) {
      Toast.fire({
        icon: "info",
        title: "Debe escoger al menos 2 ingredientes"
      });
    } else {
      let arr = [];
      let cont = 0;
      dataDishes.forEach((dish) => {
        cont = 0;
        selectedOptions.forEach((option) => {
          if (dish.tags.includes(option)) {
            cont++;
          }
        });
        if (cont === selectedOptions.length) {
          arr = [...arr, dish];
        }
      });
      setMatchingDishes(arr);
    }
  };

  return (
    <div className={styles.searchByIngredientsContainer}>
      <div className={styles.searchByIngredientsSubContainer}>
        <div className={styles.selectBox}>
          <Select
            className={styles.selectInput}
            placeholder="Elegir ingredientes..."
            isMulti
            options={listIngredients.map((tag) => ({
              label: tag,
              value: tag
            }))}
            onChange={(items) =>
              setSelectedOptions(items.map((item) => item.value))
            }
          />
        </div>
        <div className={styles.btnBox}>
          <button onClick={() => handleSelect()}>Buscar</button>
        </div>
      </div>
      <div className={styles.dishResultsContainer}>
        <div className={styles.boxContainer}>
          {matchingDishes ? (
            matchingDishes.length !== 0 ? (
              matchingDishes.map((dish) => (
                <MatchingDish key={dish._id} dish={dish} />
              ))
            ) : (
              <>
                <div className={styles.emptyMatching}>
                  <MdSearchOff size={100} className={styles.iconDish} />
                  <p className={styles.emptyParagraph}>
                    No se encontró coincidencias con los ingredientes elegidos
                  </p>
                </div>
              </>
            )
          ) : (
            <>
              <div className={styles.emptyMatching}>
                <BiDish size={100} className={styles.iconDish} />
                <p className={styles.emptyParagraph}>
                  Elija una serie de ingredientes para mostrar los platos
                  coincidentes
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
