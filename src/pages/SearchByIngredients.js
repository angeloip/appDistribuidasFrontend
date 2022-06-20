import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { MatchingDish } from "../components/MatchingDish";
import { useData } from "../context/dataContext";
import styles from "../styles/SearchByIngredients.module.css";

export const SearchByIngredients = () => {
  const [listIngredients, setListIngredients] = useData().listIngredients;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dataDishes, setDataDishes] = useData().dataDishes;
  const [matchingDishes, setMatchingDishes] = useState([]);

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
          if (dish.ingredients.includes(option)) {
            cont++;
          }
        });
        if (cont === selectedOptions.length) {
          arr = [...arr, dish];
        }
      });
      setMatchingDishes(arr);
      console.log(arr);
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
            options={listIngredients.map((ingredient) => ({
              label: ingredient,
              value: ingredient
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
          {matchingDishes.map((dish) => (
            <MatchingDish key={dish._id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
};
