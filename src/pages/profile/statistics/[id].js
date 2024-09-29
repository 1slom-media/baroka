import Head from "next/head";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  Typography,
  Grid,
  Box,
  Chip,
  Pagination,
  Skeleton,
  Card,
} from "@mui/material";
import { streamDetailAction } from "redux-store/statistics/details.slice";
import { Chart } from "components/chart";
import { getColor, getStatusText, orderStatuses } from "utils/helpers";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import EmptyDataComponent from "components/app/User-profile/EmptyDataComponent";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { stream, orders, pageCount, isLoading } = useSelector(
    (state) => state.streamDetails
  );
  const user = useSelector((state) => state.user);

  const handleChangePage = (event, newValue) => {
    router.push(`/profile/statistics/${router.query.id}?page=${newValue}`);
  };

  React.useEffect(() => {
    dispatch(
      streamDetailAction({
        token,
        id: router.query.id,
        params: {
          page: router?.query?.page ? router?.query?.page : 1,
          limit: 12,
        },
      })
    );
  }, [router.query]);

  const orderStatusCountTotal = Object.values(
    user && user?.data && user?.data?.orderCount ? user?.data?.orderCount : {}
  ).reduce((a, b) => {
    return a + b;
  }, 0);
  return (
    <AdminLayout>
      <Head>
        <title>Dozen marketing</title>
      </Head>
      <Stack>
        <Stack direction="row" alignItems="center" mb={2} gap="5px">
          <Typography variant="string" color="text.white">
            Oiqm statistikasi -{" "}
          </Typography>
          <Box
            sx={{
              background: "#08cf65",
              textAlign: "center",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
              borderRadius: "3px",
            }}
          >
            <Typography color="white" variant="string">
              #{stream?.number}
            </Typography>
          </Box>
        </Stack>
        {isLoading ? (
          <Grid container spacing={2}>
            {Array(12)
              .fill()
              .map((_, indx) => (
                <Grid item xs={12} sm={6} md={3} key={indx}>
                  <Card
                    sx={{
                      background: "#1b2530e0",
                      width: "100%",
                      borderRadius: "3px",
                    }}
                  >
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Card>
                </Grid>
              ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  p: 2,
                  borderRadius: "2px",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Stack direction="row" gap="10px">
                  <Box
                    sx={{ width: "80px", height: "80px" }}
                    component="img"
                    src={stream?.product?.image}
                  />
                  <Stack gap="10px">
                    <Typography variant="string" color="text.white">
                      {stream?.product?.title[router?.locale]}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap="10px">
                      <Typography variant="string" color="text.whiteOff">
                        To&apos;lov:
                      </Typography>
                      <Typography variant="string" color="text.white">
                        {stream?.product?.referalPrice?.toLocaleString()}{" "}
                        so&apos;m
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" gap="10px" mt={2}>
                  <Typography color="text.whiteOff" variant="string">
                    Oqim raqami:
                  </Typography>
                  <Box
                    sx={{
                      background: "#08cf65",
                      textAlign: "center",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                      borderRadius: "3px",
                    }}
                  >
                    <Typography color="white">{stream?.number}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
            {orderStatuses?.map((status) => {
              const statusOrderCount =
                user && user?.data && user?.data?.orderCount
                  ? user?.data?.orderCount[status]
                  : 0;
              const portion = (statusOrderCount * 100) / orderStatusCountTotal;
              const data2 = {
                series: [portion],
                options: {
                  chart: {
                    height: 350,
                    type: "radialBar",
                    toolbar: {
                      show: false,
                    },
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "70%",
                        background: "transparent",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24,
                        },
                      },
                      track: {
                        background: "transparent",
                        strokeWidth: "67%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35,
                        },
                      },

                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: -10,
                          show: true,
                          color: "#fff",
                          fontSize: "14px",
                        },
                        value: {
                          formatter: function (val) {
                            return parseInt(val);
                          },
                          color: "#fff",
                          fontSize: "16px",
                          show: true,
                        },
                      },
                    },
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#08cf65"],
                      inverseColors: true,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 100],
                    },
                  },
                  stroke: {
                    lineCap: "round",
                  },
                  labels: ["%"],
                },
              };
              return (
                <Grid key={status} item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      px: 3,
                      py: 1,
                      borderRadius: "2px",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack>
                        <Typography color="text.gray" variant="string">
                          {getStatusText(status)} buyurtmalar
                        </Typography>
                        <Typography mt={1} color="text.gray" variant="h5">
                          {stream ? stream[status] : 0}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Chart
                          options={data2.options}
                          series={data2.series}
                          type="radialBar"
                          width={150}
                          height={150}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Stack>
      <Stack mt={4}>
        <Stack>
          <Typography variant="string" mb={2} color="text.white">
            Oqim buyurtmalari
          </Typography>
        </Stack>
        {isLoading ? (
          <Grid container spacing={2}>
            {Array(12)
              .fill()
              .map((_, indx) => (
                <Grid item xs={12} sm={6} md={3} key={indx}>
                  <Card
                    sx={{
                      background: "#1b2530e0",
                      width: "100%",
                      borderRadius: "3px",
                    }}
                  >
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Card>
                </Grid>
              ))}
          </Grid>
        ) : !isLoading && orders?.length ? (
          <Grid container spacing={2}>
            {orders?.map((order) => (
              <Grid item xs={12} md={4} key={order?._id}>
                <Box
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    px: 3,
                    py: 1,
                    borderRadius: "2px",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                  >
                    <Stack direction="row" alignItems="center" gap="10px">
                      <Typography variant="string" color="text.whiteOff">
                        ID:
                      </Typography>
                      <Box
                        sx={{
                          background: "#08cf65",
                          textAlign: "center",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        <Typography variant="string" color="text.white">
                          #{order?.number}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap="10px">
                      <Typography variant="string" color="text.whiteOff">
                        Vaqti:
                      </Typography>
                      <Typography variant="string" color="text.white">
                        {order?.createdAt
                          ? format(
                              new Date(order?.createdAt),
                              "dd-MMMM, yyyy",
                              {
                                locale: uz,
                              }
                            )
                          : ""}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" alignItems="center" gap="10px">
                      <Typography variant="string" color="text.whiteOff">
                        Mijoz:
                      </Typography>
                      <Typography variant="string" color="text.white">
                        {order?.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap="10px">
                      <Typography variant="string" color="text.whiteOff">
                        Tel:
                      </Typography>
                      <Typography variant="string" color="text.white">
                        {order?.phone}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                  >
                    <Stack direction="row" alignItems="center" gap="10px">
                      <Typography variant="string" color="text.whiteOff">
                        Operator:
                      </Typography>
                      {order?.isTaken ? (
                        <Typography variant="string" color="text.whiteOff">
                          {order?.takenById?.name}
                        </Typography>
                      ) : (
                        <Typography variant="string" color="error.main">
                          Operator olmagan
                        </Typography>
                      )}
                    </Stack>
                    <Stack direction="row" alignItems="center" gap="15px">
                      <Typography variant="string" color="text.whiteOff">
                        Holati:
                      </Typography>
                      <Chip
                        label={getStatusText(order?.status)}
                        color={getColor(order?.status)}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                  >
                    <Typography variant="string" color="primary">
                      Siz uchun xabar:
                    </Typography>
                    <Typography variant="caption" color="warning.main">
                      {order?.message ? order?.message : "Xabar qoldirilmagan"}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack>
            <EmptyDataComponent text="Ushbu oqim orqali hali buyurtmalar kelib tushmagan" />
          </Stack>
        )}
        <Stack direction="row" justifyContent="center" my={8}>
          {pageCount > 1 ? (
            <Pagination
              color="primary"
              page={router?.query?.page ? parseInt(router?.query?.page) : 1}
              onChange={handleChangePage}
              count={pageCount}
              variant="outlined"
              shape="rounded"
            />
          ) : null}
        </Stack>
      </Stack>
    </AdminLayout>
  );
};

export default Page;
