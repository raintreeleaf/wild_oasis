import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    isFetching,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });
  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
    isFetching,
  };
}
