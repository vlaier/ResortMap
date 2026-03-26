import { useQuery } from "@tanstack/react-query";
import { getResortLayout } from "../api/getResortLayout";
const REFETCH_INTERVAL = 40_000;
export const useResortLayout = () => {
  return useQuery({
    queryKey: ["resortLayout"],
    queryFn: async () => {
      return getResortLayout();
    },
    refetchInterval: REFETCH_INTERVAL,
  });
};
