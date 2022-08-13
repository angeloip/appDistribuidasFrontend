import styles from "../styles/Rating.module.css";
import { FaRegCheckCircle, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";
import { useApi } from "../context/apiContext";
import nophoto from "../nophoto.jpeg";
import { RatingView } from "./RatingView";

export const Rating = ({ dish, setIsRating, setReviews, reviews }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [beUser] = useAuth().beUser;
  const [review, setReview] = useState(null);

  const createDishReviewRequest = useApi().createDishReviewRequest;

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  const handleRating = async () => {
    if (beUser) {
      if (rating && comment.trim().length !== 0) {
        setIsLoading(true);

        const data = {
          rating: rating,
          comment: comment
        };

        await createDishReviewRequest(dish._id, data)
          .then((res) => {
            setIsRating(res.data.rating);
            setReviews(res.data.reviews);

            Toast.fire({
              icon: "success",
              title: "Reseña realizada"
            });
          })
          .catch((err) => console.log(err.response));

        setIsLoading(false);
      } else {
        Toast.fire({
          icon: "info",
          title: "Debe poner una voloración y una opinión"
        });
      }
    } else {
      Toast.fire({
        icon: "info",
        title: "Inicia Sesión para realizar una reseña"
      });
    }
  };

  useEffect(() => {
    const checkReview = () => {
      if (beUser) {
        setReview(reviews.find((rev) => rev.user._id === beUser.id));
      } else {
        setReview(null);
        setRating(null);
        setComment("");
      }
    };
    checkReview();
  }, [reviews, beUser]);

  return (
    <div className={styles.ratingContainer}>
      {review ? (
        <div className={styles.urReviewContent}>
          <span className={styles.urReviewTitle}>Tu reseña</span>
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
      ) : (
        <>
          <div className={styles.titleReviewBox}>
            <span className={styles.titleReview}>Califica este plato</span>
          </div>
          <div className={styles.starWidget}>
            <div className={styles.titleRatingBox}>
              <span className={styles.titleRating}>Valoración</span>
            </div>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;

              return (
                <label key={index} className={styles.labelRating}>
                  <input
                    type="radio"
                    name="rate"
                    id={`rate-${ratingValue}`}
                    value={ratingValue}
                    className={styles.inputRadioRating}
                    onClick={() => setRating(ratingValue)}
                  />

                  <FaStar
                    className={styles.star}
                    color={
                      ratingValue <= (hover || rating) ? "ffc107" : "#e4e5e9"
                    }
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>

          <div>
            <div className={styles.titleRatingBox}>
              <span className={styles.titleRating}>Opinión</span>
            </div>
            <textarea
              className={styles.textAreaRating}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <div>
            <button
              className={styles.voteBtn}
              onClick={handleRating}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner color={"#28a745"} />
                  <span>Publicando...</span>
                </>
              ) : (
                <>
                  <FaRegCheckCircle size={20} />
                  <span>Publicar</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
