import React from "react";
import styles from "./BaseInfiniteScroll.module.css";
import { UnsplashImage } from "../../type/Unsplash";

interface UnsplashCardProps {
  image: UnsplashImage;
  key: string;
}

const UnsplashCard = React.forwardRef<HTMLDivElement, UnsplashCardProps>(
  ({ image }, ref) => {
    return (
      <div className={styles.imageCard} ref={ref}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageInfo}>
          <div className={styles.userDetails}>
            <img
              src={image.user.profile_image.small}
              alt={image.user.name}
              className={styles.userProfile}
              loading="lazy"
            />
            <p className={styles.imageTitle}>{image.user.name}</p>
          </div>
          <p className={styles.imageDescription}>
            {image.alt_description || "No description available"}
          </p>
          <p className={styles.imageLikes}>
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            {image.likes} likes
          </p>
          {image.sponsorship && (
            <p className={styles.imageSponsor}>
              Sponsored by {image.sponsorship.sponsor.name}
            </p>
          )}
        </div>
      </div>
    );
  },
);

export default UnsplashCard;
