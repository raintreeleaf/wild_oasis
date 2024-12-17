import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => curr.totalPrice + acc, 0);
  const checkins = confirmedStays.length;
  //occupation or occupancy rate
  //number or checked in nights divide by total nights(num of days * num of cabins)
  const occupation =
    confirmedStays.reduce((acc, curr) => curr.numNights + acc, 0) /
    (numBookings * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}
export default Stats;
// import {
//   HiOutlineBriefcase,
//   HiOutlineCalendarDays,
//   HiOutlineBanknotes,
//   HiOutlineChartBar,
// } from 'react-icons/hi2';
// import { formatCurrency } from 'utils/helpers';
// import Stat from './Stat';

// function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
//   // Stat 1)
//   const numBookings = bookings.length;

//   // Stat 2)
//   const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

//   // Stat 3)
//   const checkins = confirmedStays.length;

//   // Stat 4)
//   // We will use a trick to calculate occupancy rate. It's not 100% accurate, but we want to keep it simple. We know we can have a total of 'numDays * cabinCount' days to occupy, and we also know how many days were actually booked. From this, we can compute the percentage
//   const occupation =
//     confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
//     (numDays * cabinCount);

//   return (
//     <>
//       <Stat
//         icon={<HiOutlineBriefcase />}
//         title='Bookings'
//         value={numBookings}
//         color='blue'
//       />
//       <Stat
//         icon={<HiOutlineBanknotes />}
//         title='Sales'
//         value={formatCurrency(sales)}
//         color='green'
//       />
//       <Stat
//         icon={<HiOutlineCalendarDays />}
//         title='Check ins'
//         value={checkins}
//         color='indigo'
//       />
//       <Stat
//         icon={<HiOutlineChartBar />}
//         title='Occupancy rate'
//         value={Math.round(occupation * 100) + '%'}
//         color='yellow'
//       />
//     </>
//   );
// }

// export default Stats;
