import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <XAxis
            dataKey={"label"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            dataKey={"totalSales"}
            fill={colors.totalSales.fill}
            stroke={colors.totalSales.stroke}
            type="monotone"
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey={"extrasSales"}
            fill={colors.extrasSales.fill}
            stroke={colors.extrasSales.stroke}
            type="monotone"
            strokeWidth={2}
            name="Extra Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
// function SalesChart({ bookings, numDays }) {
//   // In the chart we need to set colors, but we can't do it based on CSS variables, because we have no access to them here. So let's set them manually
//   const { isDarkMode } = useDarkMode();

//   const allDates = eachDayOfInterval({
//     start: subDays(new Date(), numDays - 1),
//     end: new Date(),
//   });

//   const data = allDates.map((date) => {
//     return {
//       label: format(date, 'MMM dd'),
//       totalSales: bookings
//         .filter((booking) => isSameDay(date, new Date(booking.created_at)))
//         .reduce((acc, cur) => acc + cur.totalPrice, 0),
//       extrasSales: bookings
//         .filter((booking) => isSameDay(date, new Date(booking.created_at)))
//         .reduce((acc, cur) => acc + cur.extrasPrice, 0),
//     };
//   });

//   return (
//     <StyledSalesChart>
//       <Heading type='h2'>
//         Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
//         {format(allDates.at(-1), 'MMM dd yyyy')}
//       </Heading>

//       <ResponsiveContainer width='100%' height={300}>
//         {/* <AreaChart data={data} width={700} height={300}> */}
//         <AreaChart data={data}>
//           <XAxis
//             dataKey='label'
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <YAxis
//             unit='$'
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <CartesianGrid strokeDasharray='4' />
//           <Tooltip contentStyle={{ backgroundColor: colors.background }} />
//           <Area
//             type='monotone'
//             dataKey='totalSales'
//             // stroke='#4f46e5'
//             // fill='#c7d2fe'
//             stroke={colors.totalSales.stroke}
//             fill={colors.totalSales.fill}
//             strokeWidth={2}
//             unit='$'
//             name='Total sales'
//           />
//           <Area
//             type='monotone'
//             dataKey='extrasSales'
//             // stroke='#15803d'
//             // fill='#dcfce7'
//             stroke={colors.extrasSales.stroke}
//             fill={colors.extrasSales.fill}
//             strokeWidth={2}
//             unit='$'
//             name='Extras sales'
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </StyledSalesChart>
//   );
// }

export default SalesChart;
