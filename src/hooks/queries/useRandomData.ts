import { useQuery } from "@tanstack/react-query";
import { randomQueryKey } from "../../constants/queryKeys.ts";
import { getRandomData } from "../../servies/randomService.ts";

const useRandomData = () => {
  return useQuery({
    queryKey: randomQueryKey.list.queryKey,
    queryFn: getRandomData,
    staleTime: 1000000,
  });
};

export default useRandomData;
