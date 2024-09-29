import { LoadingButton } from "@mui/lab";
import { Grid, Stack, Typography } from "@mui/material";
import Card1 from "components/general/Cards/Card1";
import PasswordInputField from "components/general/Inputs/PasswordInput";
import TextInput from "components/general/Inputs/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { loginUserAction } from "redux-store/user/auth.slice";

const Login = ({ handleSubmit }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading, regErrors } = useSelector((state) => state.auth);

  const callback = (isAdmin) => {
    if (isAdmin) {
      router.push("/profile");
    } else {
      router.push("/profile");
    }
  };

  const handleLogin = (values) => {
    dispatch(loginUserAction({ data: values, callBack: callback }));
  };

  return (
    <Card1
      sx={{
        width: { xs: "95%", md: 400 },
        borderRadius: "10px",
        boxShadow: "0px 3px 25px rgba(0, 0, 0, 0.1)",
        mt: 2,
        height: "auto",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} justifyContent="center">
          <Typography variant="body2" color="text.light" textAlign="center">
            Profilga Kirish
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextInput}
            placeholder="Login"
            name="username"
            fullWidth
            size="medium"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={PasswordInputField}
            placeholder="Parol"
            name="password"
            size="medium"
          />
        </Grid>
        <Grid item xs={12}>
          {regErrors?.map((item, index) => (
            <Typography color="error" key={item} variant="body1">
              {item}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} mt={1} justifyContent="center">
          <LoadingButton
            onClick={handleSubmit(handleLogin)}
            fullWidth
            variant="contained"
            loading={isLoading}
            color="primary"
          >
            Kirish
          </LoadingButton>
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography textAlign="center" variant="caption" color="text.light">
              Hisobingiz yo&apos;qmi? <br />
            </Typography>
            <Link style={{ color: "red" }} href="/auth/signup">
              <Typography
                align="center"
                variant="subtitle1"
                color="primary"
                sx={{ textDecoration: "underline" }}
              >
                Ro&apos;yxatdan o&apos;tish
              </Typography>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Card1>
  );
};

function validate(props) {
  let errors = {};
  const requiredFields = ["username", "password"];
  requiredFields.forEach((field) => {
    if (!props[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  return errors;
}

export default reduxForm({
  form: "login_form",
  validate,
})(Login);
