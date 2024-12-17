import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../bookings/BookingDataBox";

import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
// import { useCheckin } from "./useCheckin";

import styled from "styled-components";
// import { box } from "styles/styles";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  // const [addBreakfast, setAddBreakfast] = useState(false);

  // const { mutate: checkin, isLoading: isCheckingIn } = useCheckin();
  // const { isLoading: isLoadingSettings, settings } = useSettings();

  // // Can't use as initial state, because booking will still be loading
  // useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  // if (isLoading || isLoadingSettings) return <Spinner />;

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  useEffect((_) => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);
  const moveBack = useMoveBack();
  const { checkin, isCheckinIn } = useCheckin();
  if (isLoading || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkin({ bookingId });
  }

  // // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={(_) => {
              setAddBreakfast((add) => !add);
              setConfirmPaid((confirm) => !confirm);
            }}
            id="breakfast"
            disabled={isLoadingSettings}
          >
            Want to add breakfast for ${settings.breakfastPrice}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={(_) => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckinIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )}(${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckinIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
export default CheckinBooking;
