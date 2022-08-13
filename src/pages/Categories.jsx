import styles from "../styles/Categories.module.css";
import { Accordion } from "../components/Accordion";
import {
  AccordionSkeleton,
  ProductCardSkeleton
} from "../components/SkeletonMolds";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useApi } from "../context/apiContext";
import Spinner from "../components/Spinner";

export const Categories = () => {
  const [nameCategory, setNameCategory] = useState("Todo");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const getDishesForCategoryRequest = useApi().getDishesForCategoryRequest;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  document.title = "Categorías";

  /* const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }; */

  useEffect(() => {
    if (page !== 1) {
      const moreData = async () => {
        setIsLoadingBtn(true);
        const category = {
          category: nameCategory
        };
        await getDishesForCategoryRequest(category, page)
          .then((res) => setData((prevData) => prevData.concat(res.data.docs)))
          .catch((error) => alert(error.response));

        setIsLoadingBtn(false);
      };

      moreData();
    }
  }, [page]);

  useEffect(() => {
    const setCategory = async () => {
      setIsLoading(true);
      const category = {
        category: nameCategory
      };
      await getDishesForCategoryRequest(category)
        .then((res) => {
          setData(res.data.docs);
          setPage(1);
          setFirstLoading(false);
        })
        .catch((error) => alert(error.response));

      setIsLoading(false);
    };
    setCategory();
  }, [nameCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className={styles.categoriesBox}>
      <figure className={styles.figureCategorie}>
        <h2>{nameCategory}</h2>
      </figure>
      <div className={styles.categoriesContainer}>
        <div className={styles.subCategoriesContainer}>
          <div className={styles.categoryFilters}>
            {isLoading && firstLoading ? (
              <AccordionSkeleton />
            ) : (
              <>
                <h2 className={styles.boxTittle}>Filtros</h2>
                <Accordion
                  nameCategory={nameCategory}
                  setNameCategory={setNameCategory}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>

          <div className={styles.results}>
            <div className={styles.cardsContent}>
              {isLoading
                ? [...Array(10)].map((x, i) => <ProductCardSkeleton key={i} />)
                : data.map((producto) => (
                    <ProductCard key={producto._id} producto={producto} />
                  ))}
            </div>

            <div className={styles.load}>
              <button
                className={styles.loadBtn}
                disabled={isLoadingBtn}
                onClick={() => setPage((prevPage) => prevPage + 1)}
              >
                {isLoadingBtn ? (
                  <>
                    <Spinner size={20} color={"#fff"} />
                    Cargando...
                  </>
                ) : (
                  "Cargar Más"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
