import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import AppLayout from "components/app/AppLayout";
import { StyledBorderBox } from "components/app/User-profile/StyledComponents";
import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OrderCard from "components/general/Cards/OrderCard";
import { useSelector, useDispatch } from "react-redux";
import { emptyBasket } from "redux-store/cart/cart.slice";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import OrderForm from "components/app/OrderForm";
import { useRouter } from "next/router";

const Page = () => {
  const cartItems = useSelector((state) => state.cart.data);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <AppLayout>
      <Stack my={2}>
        {!cartItems.length || cartItems.length == 0 ? (
          <EmptyPageWrapper>
            <EmptyCard
              img="/assets/empty/product.png"
              btn={true}
              btnText="Ortga qaytish"
              path="/"
              txt="Mahsulot mavjud emas!"
            />
          </EmptyPageWrapper>
        ) : (
          <Grid container>
            <Grid item xs={12} md={8}>
              <Grid container>
                <Grid item xs={12} md={12}>
                  {cartItems.map((data, key) => (
                    <StyledBorderBox p={2} key={`1${key}3434`}>
                      <OrderCard {...data} />
                    </StyledBorderBox>
                  ))}
                  <StyledBorderBox p={2}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => router.back()}
                      >
                        <KeyboardBackspaceIcon sx={{ mr: 1 }} />
                        <Typography display={{ xs: "none", md: "block" }}>
                          Ortga qaytish
                        </Typography>
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => dispatch(emptyBasket([]))}
                        size="small"
                      >
                        <Typography>Barchasini o&apos;chirish</Typography>
                      </Button>
                    </Stack>
                  </StyledBorderBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledBorderBox px={2} py={5}>
                <Stack direction="column" justifyContent="center" gap="20px">
                  <Box>
                    <Typography variant="h6" color="text.main">
                      Mahsulot soni:
                    </Typography>
                    <Typography variant="h5" color="text.main">
                      {cartItems.length} dona
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="h6" color="text.main">
                      Umumiy summa:
                    </Typography>
                    <Typography variant="h5" color="text.main">
                      {totalPrice.toLocaleString()} so&apos;m
                    </Typography>
                  </Box>
                </Stack>
              </StyledBorderBox>
              <StyledBorderBox
                px={2}
                py={5}
                sx={{ backgroundColor: "background.lightPurple" }}
              >
                <OrderForm />
              </StyledBorderBox>
            </Grid>
          </Grid>
        )}
      </Stack>
    </AppLayout>
  );
};

export default Page;
