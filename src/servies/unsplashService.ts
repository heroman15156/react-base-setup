import { UnsplashImage } from "../type/Unsplash.ts";
import { fetchImages } from "../repositories/unsplashRepository.ts";
const PER_PAGE = 10;

export const getImages = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  images: UnsplashImage[];
  total: number;
  totalPages: number;
}> => {
  try {
    const { data, total, total_pages } = await fetchImages(pageParam, PER_PAGE);
    return { images: data, total, totalPages: total_pages };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
