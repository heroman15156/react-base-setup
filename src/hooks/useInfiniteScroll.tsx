import { useEffect, useRef, useState } from "react";
import { getImages } from "../servies/unsplashService.ts";
import { UnsplashImage } from "../type/Unsplash.ts";

const useInfiniteScroll = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const {
        images: newImages,
        total: newTotal,
        totalPages: newTotalPages,
      } = await getImages(pages);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setTotal(newTotal);
      setTotalPages(newTotalPages);
      setHasMore(pages < newTotalPages);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [pages]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];

        if (lastEntry.isIntersecting && !loading && hasMore) {
          setPages(pages + 1);
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.5,
      },
    );
    if (lastImageRef.current) {
      observerRef.current.observe(lastImageRef.current);
    }

    return () => {
      if (lastImageRef.current) {
        observerRef.current?.unobserve(lastImageRef.current);
      }
    };
  }, [loading, hasMore]);

  return {
    images,
    loading,
    lastImageRef,
    total,
    totalPages,
    hasMore,
  };
};

export default useInfiniteScroll;
