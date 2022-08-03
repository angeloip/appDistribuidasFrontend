import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useApi } from "../context/apiContext";
import styles from "../styles/Search.module.css";
import { SearchResults } from "./SearchResults";

export const Search = ({ width, setShow }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getSearchDishesRequest = useApi().getSearchDishesRequest;

  const handleChange = (e) => setQueryText(e.target.value);

  const searchRequest = async () => {
    await getSearchDishesRequest(queryText)
      .then((res) => setSearchResults(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (!queryText) {
      setSearchResults([]);
    } else {
      searchRequest();
    }
  }, [queryText]);
  return (
    <div className={styles.searchContainer}>
      <form action="" className={styles.formulario}>
        <div className={styles.cont_input} style={{ width: `${width}` }}>
          <div className={styles.iconContent}>
            <GoSearch
              size={20}
              className={styles.iconSearch}
              fill={"#f24726"}
            />
          </div>

          <input
            type="search"
            name="producto"
            id="producto"
            placeholder="Nombre del Plato"
            autoComplete="off"
            className={`${styles.form__input} ${styles.inputPass}`}
            value={queryText}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className={styles.resultsContent}>
        {searchResults.length !== 0 ? (
          <SearchResults
            searchResults={searchResults}
            setShow={setShow}
            setQueryText={setQueryText}
          />
        ) : null}
      </div>
    </div>
  );
};
