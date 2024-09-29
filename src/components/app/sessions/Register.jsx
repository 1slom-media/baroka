import { LoadingButton } from "@mui/lab";
import { Grid, Stack, Typography } from "@mui/material";
import PasswordInputField from "components/general/Inputs/PasswordInput";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import TextInput from "components/general/Inputs/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registerAction } from "redux-store/user/auth.slice";
import Card1 from "components/general/Cards/Card1";

const Register = ({ handleSubmit }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthRegLoading, regErrors } = useSelector((state) => state.auth);

  const callback = (isAdmin) => {
    if (isAdmin) {
      router.push("profile");
    } else {
      router.push("/profile");
    }
  };

  const handleFormSubmit = (values) => {
    dispatch(registerAction({ data: values, callBack: callback }));
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.light" textAlign="center">
            Ro&apos;yxatdan o&apos;tish
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
          <Field
            component={TextInput}
            placeholder="Login"
            name="username"
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
        <Grid item xs={12}>
          <LoadingButton
            onClick={handleSubmit(handleFormSubmit)}
            fullWidth
            variant="contained"
            loading={isAuthRegLoading}
            color="primary"
          >
            Ro&apos;yxatdan o&apos;tish
          </LoadingButton>
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography align="string" variant="caption" color="text.light">
              Hisobingiz allaqachon mavjudmi? <br />
            </Typography>
            <Link style={{ color: "red" }} href="/auth">
              <Typography
                align="center"
                variant="subtitle1"
                color="primary"
                sx={{ textDecoration: "underline" }}
              >
                Profliga kirish
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
  const requiredFields = ["username", "password", "phone"];
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
