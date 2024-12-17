import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckinOut } = useMutation({
    // You can only pass one arg to mutationFn
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, {
        status: "checked-out",
      });
    },
    // for onSuccess to receive the data as argument, the data needs to be
    // returned in 2 places. The api updateBooking as well as the mutationFn.
    //Do not forget to use return if you add braces in arrow functions.
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out!`);
      queryClient.invalidateQueries({ active: true }); //invalidate queries active on the page
    },
    onError: (_) => toast.error("There is an error while checking in!"),
  });
  return { checkout, isCheckinOut };
}
