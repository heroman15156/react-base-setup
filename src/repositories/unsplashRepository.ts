import axios from "axios";
import { UnsplashImage } from "../type/Unsplash.ts";

export const fetchImages = async (page: number, perPage: number) => {
  const { data, headers } = await axios.get<UnsplashImage[]>(
    "https://api.unsplash.com/photos",
    {
      params: {
        client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
        page,
        per_page: perPage,
      },
    },
  );

  const total = parseInt(headers["x-total"], 10) || 0;
  const total_pages = Math.ceil(total / perPage);
  return {
    data,
    total,
    total_pages,
  };
};
