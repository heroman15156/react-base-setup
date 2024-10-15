import React from "react";
import styles from "./BaseInfiniteScroll.module.css";
import UnsplashCard from "./UnsplashCard.tsx";
import useInfiniteScrollRQ from "../../hooks/useInfiniteScroll-RQ.ts";
import Loading from "../Loading.tsx";

const UnsplashInfiniteScroll: React.FC = () => {
  // const { images, loading, lastImageRef } = useInfiniteScroll();
  const { images, hasNextPage, isFetching, isFetchingNextPage, ref } =
    useInfiniteScrollRQ();

  return (
    <div className={styles.container}>
      <h1>Unsplash Infinite Scroll</h1>
      <div className={styles.imageGrid}>
        {images.map((image, index) => {
          return (
            <UnsplashCard
              key={image.id}
              image={image}
              ref={index === images.length - 1 ? ref : undefined}
            />
          );
        })}
      </div>
      {!hasNextPage && <h1>No more images to load</h1>}
      {(isFetching || isFetchingNextPage) && <Loading />}
    </div>
  );
};

export default UnsplashInfiniteScroll;
