import styles from "../styles/ProductReviews.module.css";
import { SingleReview } from "./SingleReview";

export const ProductReviews = ({ reviews }) => {
  return (
    <div className={styles.productReviewsContainer}>
      <div className={styles.reviewTitleBox}>
        <span className={styles.reviewTitle}>RESEÑAS</span>
      </div>
      <div className={styles.reviewsContent}>
        {reviews.map((review) => (
          <SingleReview key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};
