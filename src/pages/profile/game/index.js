import {
  Box,
  Grid,
  Stack,
  Typography,
  Card,
  Button,
  Skeleton,
} from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getGames } from "redux-store/game/game.slice";
import format from "date-fns/format";
import HtmlParser from "react-html-parser";
import { uz } from "date-fns/locale";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmptyDataComponent from "components/app/User-profile/EmptyDataComponent";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { list, isLoading } = useSelector((state) => state.game);

  useEffect(() => {
    if (token) {
      dispatch(getGames(token));
    } else {
      router.push("/");
    }
  }, [token]);
  return (
    <AdminLayout>
      <Head>
        <title>chegirma.com konkurslar</title>
      </Head>
      <Stack>
        <Typography mb={2} variant="string" color="text.white">
          Mavjud konkurs tanlovlari
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
          {isLoading ? (
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
                      }}
                    >
                      <Stack gap="10px">
                        <Skeleton variant="rectangular" height={220} />
                        <Skeleton variant="rectangular" />
                        <Skeleton variant="rectangular" />
                        <Skeleton variant="rectangular" />
                        <Skeleton variant="rectangular" />
                        <Skeleton variant="rectangular" />
                      </Stack>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          ) : !isLoading && list?.length ? (
            <Grid container spacing={2}>
              {list?.map((game) => {
                const startTime = new Date(game.startTime);
                const endTime = new Date(game.endTime);
                const today = new Date();
                const endDiff = today - endTime;
                const startDiff = today - startTime;
                const diff = endTime - startTime;
                return (
                  <Grid key={game._id} item xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={{
                        background: "#1b2530e0",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          borderRadius: "3px",
                          height: "300px",
                        }}
                        component="img"
                        src={game.banner}
                        alt="Game banner"
                      />
                      <Stack p={1}>
                        <Typography color="text.white">{game.name}</Typography>
                        <Typography
                          level="body-xs"
                          color="text.whiteOff"
                          variant="string"
                        >
                          {HtmlParser(game?.content?.slice(0, 300))}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="end"
                        p={1}
                      >
                        <Button
                          onClick={() =>
                            router.push(`/profile/game/${game._id}`)
                          }
                          startIcon={<RemoveRedEyeIcon />}
                          variant="outlined"
                        >
                          Natijani ko&apos;rish
                        </Button>
                        <Stack>
                          <Typography
                            align="end"
                            variant="caption"
                            color={
                              diff > 0 && endDiff < 0 && startDiff > 0
                                ? "primary"
                                : diff > 0 && endDiff < 0 && startDiff < 0
                                ? "warning.main"
                                : diff > 0 && endDiff > 0
                                ? "error.main"
                                : "primary"
                            }
                          >
                            {diff > 0 && endDiff < 0 && startDiff > 0
                              ? "Davom etmoqda"
                              : diff > 0 && endDiff < 0 && startDiff < 0
                              ? "Yaqinda boshlanadi"
                              : diff > 0 && endDiff > 0
                              ? "Yakunlangan"
                              : ""}
                          </Typography>
                          <Stack direction="row" alignItems="center" gap="5px">
                            <AccessTimeIcon />
                            <Typography variant="caption" color="whiteOff">
                              {game?.createdAt
                                ? format(
                                    new Date(game?.createdAt),
                                    "dd-MMMM, HH:mm",
                                    {
                                      locale: uz,
                                    }
                                  )
                                : ""}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <EmptyDataComponent text="Hozircha  konkurslar qo'shilmagan" />
          )}
        </Box>
      </Stack>
    </AdminLayout>
  );
};

export default Page;
