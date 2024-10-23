import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../../../constants/queryKeys.ts";
import axiosInstance from "../../../api/axios.ts";

export function useComments() {
  const { data: comments, isLoading } = useQuery<[], AxiosError>({
    queryFn: async () => {
      await axiosInstance.get("/200");
      return [];
    },
    queryKey: [queryKeys.comments.list],
    throwOnError: true,
  });

  return { comments, isLoading };
}
