import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckinIn } = useMutation({
    // You can only pass one arg to mutationFn
    mutationFn: ({ bookingId, breakfast }) => {
      return updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    // for onSuccess to receive the data as argument, the data needs to be
    // returned in 2 places. The api updateBooking as well as the mutationFn.
    //Do not forget to use return if you add braces in arrow functions.
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      queryClient.invalidateQueries({ active: true }); //invalidate queries active on the page
      navigate("/");
    },
    onError: (_) => toast.error("There is an error while checking in!"),
  });
  return { checkin, isCheckinIn };
}
