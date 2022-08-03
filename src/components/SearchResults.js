import { Link } from "react-router-dom";
import noImg from "../img/no-image-dish.jpg";
import styles from "../styles/SearchResults.module.css";

export const SearchResults = ({
  searchResults,
  setShow = false,
  setQueryText
}) => {
  return (
    <div className={styles.searchResultContainer}>
      {searchResults.map((result, index) => (
        <div
          key={index}
          className={styles.resultBox}
          onClick={() => {
            setShow(false);
            setQueryText("");
          }}
        >
          <Link
            to={`/plato/detalles/${result._id}`}
            className={styles.linkDetails}
          >
            <figure className={styles.figure}>
              <img src={result.image.url || noImg} alt={result.name} />
            </figure>
            <div className={styles.moreInfo}>
              <span className={styles.category}>{result.category}</span>
              <span className={styles.name}>{result.name}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
