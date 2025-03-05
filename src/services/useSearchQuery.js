import { useQuery } from "@tanstack/react-query";

const useSearchQuery = (queryKey, query, fetchFunction, bolean = true) => {
  return useQuery({
    queryKey: [queryKey, query],
    queryFn: () => fetchFunction(query),
    enabled: bolean,
  });
};

export default useSearchQuery;
