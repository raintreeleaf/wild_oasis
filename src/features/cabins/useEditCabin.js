import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: (_) => {
      toast.success("Successfully Updated");
      queryClient.invalidateQueries({ queryKey: "cabins" });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
