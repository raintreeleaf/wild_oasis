import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  // isLoading, data, error are all react states
  //When the cache is invalidated, reactquery refetches data and the component is rerendered again.
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="booking" />;
  //filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //sortby
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  console.log("filtered", filteredCabins);
  const modifier = direction === "asc" ? 1 : -1;
  //sort with no arguments coerce values into strings; might produce weird results with numbers
  const sortedCabins =
    field === "name"
      ? filteredCabins.sort(
          (a, b) => a[field].localeCompare(b[field]) * modifier
        )
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  console.log("sorted", sortedCabins);
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;
