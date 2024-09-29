import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getConfirmCode } from "redux-store/user/auth.slice";
import Card1 from "components/general/Cards/Card1";

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  background: "url(/assets/loginbgk.svg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Register = ({ handleSubmit }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isPhoneCodeLoading, regErrors } = useSelector((state) => state.auth);

  const callback = (msg) => {
    if (msg) router.push("/auth/code");
  };

  const handleFormSubmit = (values) => {
    values["phone"] = `+${values.phone.replace(/\D/g, "")}`;
    dispatch(getConfirmCode({ data: values, callBack: callback }));
  };

  return (
    <Stack height="100vh">
      <StyledBox>
        <Card1
          sx={{
            width: { xs: "95%", md: 400 },
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.light" textAlign="center">
                Saytga kirish uchun telefon raqamingizni kiritng
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                component={PhoneMaskInput}
                placeholder="Telefon raqam"
                name="phone"
                size="medium"
              />
            </Grid>
            <Grid item xs={12}>
              {regErrors?.map((item, index) => (
                <Typography color="error" key={item} variant="body1">
                  {index + 1}. {item}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                onClick={handleSubmit(handleFormSubmit)}
                fullWidth
                variant="contained"
                loading={isPhoneCodeLoading}
                color="primary"
              >
                Profilga kirish
              </LoadingButton>
            </Grid>
          </Grid>
        </Card1>
      </StyledBox>
    </Stack>
  );
};

function validate(props) {
  let errors = {};
  const requiredFields = ["phone"];
  requiredFields.forEach((field) => {
    if (!props[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  return errors;
}

export default reduxForm({
  form: "register_form",
  validate,
})(Register);
