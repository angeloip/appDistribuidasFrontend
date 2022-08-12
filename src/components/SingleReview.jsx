import styles from "../styles/SingleReview.module.css";
import nophoto from "../nophoto.jpeg";
import { RatingView } from "./RatingView";

export const SingleReview = ({ review }) => {
  return (
    <div className={styles.singleReviewContainer}>
      <div className={styles.urReviewCredentials}>
        <div className={styles.userCredentials}>
          <img src={nophoto} alt="" />
          <div className={styles.userDate}>
            <span className={styles.name}>{review.user.name}</span>
            <span className={styles.date}>{review.date}</span>
          </div>
        </div>
        <RatingView rating={review.rating} />
        <div>
          <span className={styles.comment}>{review.comment}</span>
        </div>
      </div>
    </div>
  );
};
