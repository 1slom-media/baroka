import { Box, Button, Stack, styled, Typography } from "@mui/material";
import AppLayout from "components/app/AppLayout";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import DoneAll from "components/icons/DoneAll";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
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

const Page = () => {
  const dispatch = useDispatch();
  const deleteOrders = () => {
    dispatch(emptyBasket([]));
  };
  return (
    <AppLayout>
      <EmptyPageWrapper sx={{ backgroundColor: "background.paper" }}>
        <Stack>
          <Stack justifyContent="center" alignItems="center">
            <StyledImgWrapper>
              <DoneAll sx={{ fontSize: "70px" }} />
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
