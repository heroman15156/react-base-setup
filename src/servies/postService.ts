import { fetchPosts } from "../repositories/postRepository.ts";

const getPosts = async () => {
  return await fetchPosts();
};

export { getPosts };
