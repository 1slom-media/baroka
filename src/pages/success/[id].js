import { Box, Button, Divider, Stack, styled, Typography } from "@mui/material";
import AppLayout from "components/app/AppLayout";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import DoneAll from "components/icons/DoneAll";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { emptyBasket } from "redux-store/cart/cart.slice";

const StyledImgWrapper = styled(Box)(({ theme }) => ({
  width: "112px",
  height: "112px",
  borderRadius: "50%",
  backgroundColor: "rgb(157 237 228 / 60%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledOrderWrapper = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  background: "rgba(86, 106, 127, 0.1)",
  border: "1px solid rgba(60, 81, 134, 0.1)",
}));

const Page = () => {
  const dispatch = useDispatch();
  const deleteOrders = () => {
    dispatch(emptyBasket([]));
  };
  const order = useSelector((state) => state.orderCreate.data);
  let overall = order.orderItems?.reduce((acc, curr) => {
    let perPrice = curr?.price * curr?.quantity;
    return perPrice + acc;
  }, 0);


  return (
    <AppLayout>
      <EmptyPageWrapper>
        <Stack my={2}>
          <Stack justifyContent="center" alignItems="center">
            <StyledImgWrapper>
              <DoneAll
                sx={{
                  fontSize: "70px",
                }}
              />
            </StyledImgWrapper>
          </Stack>
          <Typography variant="h6" my={2} color="text.main" textAlign="center">
            Arizangiz qabul qilindi!
          </Typography>
          <Typography
            variant="body2"
            mb={2}
            color="text.main"
            textAlign="center"
          >
            Tez orada adminlarimiz siz bilan bog&apos;lanishadi.
          </Typography>
          <StyledOrderWrapper p={2}>
            {order.orderItems?.map((item) => (
              <Stack
                key={item.quantity}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="body2" color="text.main">
                  {item?.productId?.name}
                </Typography>
                <Typography variant="body1" color="text.main">
                  {item.quantity} x {item?.productId?.price?.toLocaleString()}{" "}
                  so&apos;m
                </Typography>
              </Stack>
            ))}
            <Divider
              sx={{
                border: "1.3px dashed rgba(60, 81, 134, 0.5)",
                margin: "10px 0",
              }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="body2" color="text.main">
                Buyurtma
              </Typography>
              <Typography variant="body1" color="text.main">
                {order.number}
              </Typography>
            </Stack>
            <Divider
              sx={{
                border: "1.3px solid rgba(60, 81, 134, 0.5)",
                margin: "10px 0",
              }}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="body2" color="text.main">
                Jami summa
              </Typography>
              <Typography variant="body1" color="text.main">
                {overall?.toLocaleString()} so&apos;m
              </Typography>
            </Stack>
          </StyledOrderWrapper>
          <Stack alignItems="center">
            <Link href="/">
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: "15px", mt: 2 }}
                onClick={deleteOrders}
              >
                Bosh sahifaga qaytish
              </Button>
            </Link>
          </Stack>
        </Stack>
      </EmptyPageWrapper>
    </AppLayout>
  );
};

export default Page;
