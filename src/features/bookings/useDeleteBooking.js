import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: (_) => {
      toast.success("successfully deleted");
      queryClient.invalidateQueries({ queryKey: "bookings" });
      // invalidating "bookings" will invalidate every cache with bookings its array of keys.
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deleteBooking };
}
