import { LoadingButton } from "@mui/lab";
import { Grid, Stack, Typography, styled } from "@mui/material";
import CardMaskInput from "components/general/Inputs/CardMaskInput";
import TextInput from "components/general/Inputs/TextField";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { addUserPaymentAction } from "redux-store/payment/addPayment.slice";
import SendIcon from "@mui/icons-material/Send";

const StyledField = styled(Field)(({ theme }) => ({
  "& .MuiFormHelperText-root": {
    padding: "5px 0 0 0",
    margin: 0,
    backgroundColor: "transparent",
  },
}));

const Payment = ({ handleSubmit, isShop }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const isPaymentPending = useSelector(
    (state) => state.userCreatePayments.isLoading
  );

  const handlePaymentSubmit = (values) => {
    values.amount = parseInt(values?.amount);
    dispatch(addUserPaymentAction({ values, token }));
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="string" color="text.whiteOff">
          Pul yechish
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledField
          component={CardMaskInput}
          name="card"
          placeholder="Karta raqami"
          label="Karta raqami"
          size="small"
          InputLabelProps={{
            sx: {
              color: "#fff",
            },
          }}
          sx={{
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              backgroundColor: "transparent",
              borderRadius: "6px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledField
          component={TextInput}
          name="amount"
          placeholder="Pul miqdori"
          label="Pul miqdori"
          type="number"
          size="small"
          InputLabelProps={{
            sx: {
              color: "#fff",
            },
          }}
          sx={{
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              backgroundColor: "transparent",
              borderRadius: "6px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              "& fieldset legend": {
                color: "white",
                opacity: 1,
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack alignItems="start">
          <LoadingButton
            loading={isPaymentPending}
            onClick={handleSubmit(handlePaymentSubmit)}
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
          >
            So&apos;rov jo&apos;natish
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["amount", "card"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
  if (values["card"]?.replace(/\D/g, "").length < 16) {
    errors["card"] = "Karta raqam noto'g'ri kiritildi";
  }
  return errors;
};

export default reduxForm({
  form: "user_payment",
  validate,
})(Payment);
