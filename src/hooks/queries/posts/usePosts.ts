import { useQuery } from "@tanstack/react-query";
import { postQueryKey } from "../../../constants/queryKeys.ts";
import { getPosts } from "../../../servies/postService.ts";

const usePosts = () => {
  return useQuery({
    queryKey: postQueryKey.list.queryKey,
    queryFn: getPosts,
    staleTime: 100000,
  });
};

export default usePosts;
