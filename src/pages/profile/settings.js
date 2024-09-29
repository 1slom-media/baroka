import { Box, Card, Grid, Skeleton, Stack, Typography } from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import React, { useEffect } from "react";
import BotSettingsForm from "components/app/User-profile/SettingsForm";
import { getBotSettings } from "redux-store/settings/site.settings.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const bot = useSelector((state) => state.settings.bot);
  
  const isBotGetLoading = useSelector(
    (state) => state.settings.isBotGetLoading
  );

  useEffect(() => {
    if (token) {
      dispatch(getBotSettings(token));
    }
  }, [token]);
  return (
    <AdminLayout>
      <Stack pt={{ xs: 0, md: 1 }}>
        <Typography variant="string" color="text.white" mb={2}>
          Bot sozlamalri
        </Typography>
        <Box
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "3px",
            height: "100%",
            width: "100%",
            p: 2,
          }}
        >
          {isBotGetLoading ? (
            <Stack>
              <Grid container spacing={2}>
                {Array(8)
                  .fill()
                  .map((_, indx) => (
                    <Grid key={indx} item xs={12} sm={6} md={4} lg={3}>
                      <Card
                        sx={{
                          background: "#1b2530e0",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "space-between",
                          width: "100%"
                        }}
                      >
                        <Stack gap="10px">
                          <Skeleton variant="rectangular" height={50} />
                          <Skeleton variant="rectangular" height={50} />
                          <Skeleton variant="rectangular" height={50} />
                        </Stack>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
          ) : bot ? (
            <BotSettingsForm initialValues={{ ...bot }} />
          ) : null}
        </Box>
      </Stack>
    </AdminLayout>
  );
};

export default Page;
