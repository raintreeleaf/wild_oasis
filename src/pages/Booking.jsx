import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
  return <BookingDetail />;
}
export default Booking;

// Rule that we set for ourselves:
//Pages should not load data and have no side effects
//So the above might seem redundant but it is cleaner;
//all the data, etc are implemented in the features folder
