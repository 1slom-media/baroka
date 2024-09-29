import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Stack } from "@mui/system";
import AuthCode from "react-auth-code-input";
import { Box, Button, Divider, Grid, Typography, styled } from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { checkConfirmCode, getConfirmCode } from "redux-store/user/auth.slice";
import { useSelector } from "react-redux";
import { StyledBox } from ".";
import Card1 from "components/general/Cards/Card1";
const StyledBoxInput = styled(Box)(({ theme }) => ({
  textAlign: "center",
  input: {
    width: "50px",
    height: "50px",
    outline: "none",
    border: "1px solid",
    padding: 0,
    fontSize: "24px",
    textAlign: "center",
    borderColor: theme.palette.text.secondary,
    borderRadius: "5px",
    marginRight: "15px",
    backgroundClip: "padding-box",
    [theme.breakpoints.down("sm")]: {
      width: "45px",
      height: "45px",
      fontSize: "20px",
    },
  },
}));

const Page = () => {
  const [counter, setCounter] = React.useState(60);
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const callBackLogin = (isAdmin) => {
    if (isAdmin) {
      router.push("/profile/dashboard");
    } else {
      router.push("/profile/dashboard");
    }
  };

  const handleOnChange = (res) => {
    if (res.length === 4) {
      let code = parseInt(res, 10);
      dispatch(
        checkConfirmCode({
          data: { code, phone: userData.phone },
          callBack: callBackLogin,
        })
      );
    } else {
    }
  };
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, userData.phone]);

  const data = { phone: `+${userData.phoneNumber?.replace(/\D/g, "")}` };

  const handleFormSubmit = () => {
    dispatch(getConfirmCode({ data: data }));
    setCounter(60);
  };

  return (
    <Stack height="100vh">
      <StyledBox>
        <Card1
          sx={{
            width: { xs: "95%", md: 500 },
            borderRadius: "10px",
            boxShadow: "0px 3px 25px rgba(0, 0, 0, 0.1)",
            mt: 2,
            height: "auto",
          }}
        >
          <Stack>
            <Box
              onClick={() => router.push("/")}
              width={100}
              height={70}
              src="/assets/logo.png"
              component="img"
              sx={{ cursor: "pointer", margin: "auto" }}
            />
          </Stack>
          <Typography align="center" variant="body2" color="black.main" mb={2}>
            Tasdiqlash
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            align="center"
            mb={4}
          >
            {userData.phone} raqamiga yuborilgan kodni kiritng
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledBoxInput position="relative" mb={4}>
                <AuthCode
                  allowedCharacters="numeric"
                  length={4}
                  onChange={handleOnChange}
                />
              </StyledBoxInput>
              <Box textAlign="center" mb={2}>
                <Link href="/auth">
                  <Typography variant="body1" color="primary">
                    Raqamni o&apos;zgartrish ?
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box width="60%" margin="0 auto" mb={3}>
            <Divider />
          </Box>
          <Box textAlign="center">
            {counter === 0 ? (
              <Typography variant="body2" color="black.main">
                00 : 00
              </Typography>
            ) : (
              <Typography variant="body2" color="black.main">
                00 :{<> {counter < 10 ? <>0{counter}</> : <>{counter}</>}</>}
              </Typography>
            )}
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Tasdiqlash kodi kelmadimi?
            </Typography>
            <Button
              disabled={counter === 0 ? false : true}
              variant="outlined"
              color={counter === 0 ? "primary" : "secondary"}
              onClick={handleFormSubmit}
            >
              Qayta yuborish
            </Button>
          </Box>
        </Card1>
      </StyledBox>
    </Stack>
  );
};

export default Page;
