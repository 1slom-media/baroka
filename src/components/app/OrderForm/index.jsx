import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import InputField from "../../general/Inputs/TextField";
import PhoneMaskInput from "../../general/Inputs/PhoneMaskInput";
import { Field, reduxForm } from "redux-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { createUserOrderAction } from "redux-store/orders/create.slice";
import React from "react";
import { styled } from "@mui/material";
import PhoneMaskInputReact from "components/general/Inputs/PhoneMaskInputReact";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const StyledField = styled(Field)(({ theme }) => ({
  "& .MuiFormHelperText-root": {
    padding: "5px 0 0 0",
    margin: 0,
    backgroundColor: theme.palette.info[100],
  },
}));

const OrderForm = ({ handleSubmit, streamId, variantId, isRegionOn, positions }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.data?.user);
  const isOrderPostPending = useSelector(
    (state) => state.orderCreate.isLoading
  );
  const cartItems = useSelector((state) => state.cart.data);

  const callback = (id) => {
    if (id) {
      router.push(`/success/${id}`);
    } else {
      router.push(`/success`);
    }
  };

  const handleSendOrder = (values) => {
    const newItems = cartItems?.map((item) => {
      return {
        ...item,
        variantId: item._id,
      };
    });
    const data = { ...values }; // Get all values from the form

    data.position = values.position; // Include the selected position

    if (streamId) {
      data["streamId"] = streamId;
    }
    if (variantId) {
      data["orderItems"] = [{ quantity: 1, variantId: variantId, position: values.position }];
    } else {
      data["orderItems"] = newItems;
    }
    data["city_id"] = 0;
    data["phone"] = `+${values.phone?.replace(/\D/g, "")}`;

    dispatch(createUserOrderAction({ data, callback }));
  };

  return (
    <Grid container spacing={{ xs: 2, lg: 3 }}>
      <Grid item xs={12}>
        <StyledField
          component={InputField}
          label="Ism"
          placeholder="Ism"
          name="name"
          sx={{ bgcolor: "background.paper" }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <StyledField
          component={PhoneMaskInputReact}
          type="tel"
          label="Telefon raqam"
          placeholder="Telefon raqam"
          name="phone"
          sx={{ bgcolor: "background.paper" }}
        />
      </Grid>
      {positions?.length > 0 && (
        <Grid item xs={12}>
          <Field
            name="position" // Keep the name for form state
            component={({ input }) => (
              <Autocomplete
                {...input}
                options={positions} // Use the positions array directly
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pozitsiya"
                    variant="outlined"
                    error={Boolean(input.error)}
                    helperText={input.error}
                  />
                )}
                onChange={(event, newValue) => {
                  input.onChange(newValue); // Update the form value
                }}
                freeSolo // Allow free solo input
              />
            )}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Stack>
          <LoadingButton
            loading={isOrderPostPending}
            onClick={handleSubmit(handleSendOrder)}
            variant="contained"
            color="primary"
          >
            Buyurtma berish
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

function validate(values) {
  let errors = {};
  const requiredFields = ["name", "phone"];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === "") {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  if (values["phone"]?.length < 14) {
    errors["phone"] = "Telefon raqam noto'g'ri";
  }

  return errors;
}

export default reduxForm({
  form: "post_order",
  validate,
  initialValues: {
    city_id: 0,
  },
})(OrderForm);
