import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Field, reduxForm, initialize } from "redux-form";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import TelegramIcon from "@mui/icons-material/Telegram";
import IOSSwitch from "components/general/Inputs/Switch";
import { updateBotSettings } from "redux-store/settings/site.settings.slice";
import { useDispatch, connect, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

const BotSettingsForm = ({ handleSubmit, initialValues }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.user?.data);
  const isBotUpdateLoading = useSelector(
    (state) => state.settings.isBotUpdateLoading
  );
  const updateBotSettingsAsync = (values) => {
    dispatch(updateBotSettings({ token, data: values }));
  };

  useEffect(() => {
    dispatch(initialize("bot_setings_update_form", initialValues));
  }, [token]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="new_order" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Yangi buyurtmalar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="ready" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Tayyor buyurtmalar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="onway" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Yo&apos;lga chiqqan buyurtmalar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="delivered" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Yetkazilgan buyurtmalar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="canceled" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Atkaz buyurtmalar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="pending" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Keyin olinadigan buyurtmalar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="hold" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Omborda qolmagan buyurtmalar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="archived" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Arxivlangan buyurtmalar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="payment" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            To&apos;lov operatsiyalari xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="new_product" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Yangi qushilgan offerlar xabari
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Box display="flex" alignItems="center" mb={1} pt={1}>
          <Field component={IOSSwitch} name="update_product" />
          <Typography variant="subtitle1" color="text.white" ml={2}>
            Yangilangan offerlar xabari
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" my={2} justifyContent="flex-start" gap="20px">
          <LoadingButton
            loading={isBotUpdateLoading}
            color="primary"
            onClick={handleSubmit(updateBotSettingsAsync)}
            variant="contained"
            startIcon={<DownloadDoneIcon />}
          >
            Saqlash
          </LoadingButton>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<TelegramIcon />}
            target="_blank"
            component="a"
            href={`http://t.me/barokaBot?start=${user?._id}`}
          >
            Botni aktivlashtirish
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

function validate(values) {
  let errors = {};

  return errors;
}

const mapStateToProps = (state) => ({
  initialValues: {
    ...state.settings?.bot,
  },
});

export default connect(
  mapStateToProps,
  {}
)(
  reduxForm({
    form: "bot_setings_update_form",
    validate,
    enableReinitialize: true,
  })(BotSettingsForm)
);
