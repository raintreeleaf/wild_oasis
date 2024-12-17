import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //Since it doesn't make sense that after user login, it will immediately trigger useUser
      //we set the cache first, so that when useUser hook is called, it will just read from the cache
      //However, this approach makes no difference if the staleTime is small, since it
      //will always refetch the data in useUser
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error("Provided password or email is incorrect!");
    },
  });
  return { login, isLoading };
}
