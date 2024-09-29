import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux-store/user/user.slice";
import { getStatusText, orderStatuses } from "utils/helpers";
import { Chart } from "components/chart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  getMostSoldProducts,
  getTopSellers,
} from "redux-store/statistics/get.slice";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import useWindowSize from "hooks/useWindowSize";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.userStats.products);
  const sellers = useSelector((state) => state.userStats.sellers);
  const screenWidth = useWindowSize();

  React.useEffect(() => {
    if (token) {
      dispatch(getUser(token));
      dispatch(getMostSoldProducts(token));
      dispatch(getTopSellers(token));
    } else {
      router.push("/auth");
    }
  }, [token]);

  const orderStatusCountTotal = Object.values(
    user && user?.data && user?.data?.orderCount ? user?.data?.orderCount : {}
  ).reduce((a, b) => {
    return a + b;
  }, 0);

  return (
    <AdminLayout>
      <Stack>
        <Grid container spacing={2}>
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
                        {statusOrderCount}
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
      </Stack>
      <Stack py={3} mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "3px",
                height: "100%",
                width: "100%",
                pb: 2,
              }}
            >
              <Typography
                color="text.white"
                variant="string"
                p={2}
                component="h6"
              >
                Eng ko&apos;p sotilgan mahsulotlar
              </Typography>
              <TableContainer
                sx={{ width: { xs: screenWidth - 35, sm: 500, md: "100%" } }}
              >
                <Table aria-label="a dense table">
                  <TableBody>
                    {products?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "td, th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" gap="10px">
                            <Avatar
                              src={
                                row?.product?.images[0]["image"][540]["high"]
                              }
                            />
                            <Stack gap="5px">
                              <Box
                                sx={{
                                  background: "#08cf65",
                                  padding: "2px 5px",
                                  borderRadius: "3px",
                                  width: "max-content",
                                }}
                              >
                                <Typography
                                  color="text.white"
                                  variant="caption"
                                >
                                  {row?.category?.title[router?.locale]}
                                </Typography>
                              </Box>
                              <Typography color="text.gray" variant="caption">
                                {row?.product?.name?.slice(0, 32)}
                                {row?.product?.name?.length > 32 ? "..." : ""}
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          <Stack gap="5px">
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap="10px"
                            >
                              <Typography color="text.gray" variant="caption">
                                Narxi:
                              </Typography>
                              <Typography color="text.white" variant="string">
                                {row?.variant[0]?.purchasePrice?.toLocaleString()}{" "}
                                so&lsquo;m
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap="10px"
                            >
                              <Typography color="text.gray" variant="caption">
                                To&apos;lov:
                              </Typography>
                              <Typography color="text.white" variant="string">
                                {row?.variant[0].referalPrice?.toLocaleString()}{" "}
                                so&lsquo;m
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap="10px"
                            >
                              <Typography color="text.gray" variant="caption">
                                Omborda:
                              </Typography>
                              <Typography color="text.white" variant="string">
                                {row?.variant[0]?.availableAmount} dona
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="string" color="text.gray">
                            {row?.total} dona sotilgan
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "3px",
                height: "100%",
                padding: "0 10px",
                width: "100%",
                pb: 2,
              }}
            >
              <Typography
                color="text.white"
                variant="string"
                p={2}
                component="h6"
              >
                Top sotuvchilar
              </Typography>
              <TableContainer
                sx={{ width: { xs: screenWidth - 55, sm: 500, md: "100%" } }}
              >
                <Table size="small" aria-label="a dense table">
                  <TableBody>
                    {sellers.map((row, indx) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "td, th": { border: 0 },
                          background:
                            indx % 2 === 1 ? "#34414b8f" : "transparent",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap={"10px"}
                          >
                            <FiberManualRecordIcon
                              sx={{ color: "#08cf65", fontSize: "15px" }}
                            />
                            <Typography variant="string" color="text.white">
                              {row?.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap={"10px"}
                          >
                            <Typography variant="caption" color="text.white">
                              Qo&apos;shilgan vaqti:
                            </Typography>
                            <Typography variant="string" color="text.white">
                              {row?.createdAt
                                ? format(
                                    new Date(row?.createdAt),
                                    "dd-MMMM, yyyy",
                                    { locale: uz }
                                  )
                                : ""}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap={"10px"}
                          >
                            <Typography variant="caption" color="text.white">
                              Sotilgan buyurtmalar:
                            </Typography>
                            <Box
                              sx={{
                                background: "#08cf65",
                                padding: "2px 5px",
                                borderRadius: "3px",
                                minWidth: "50px",
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="string" color="text.white">
                                {row?.soldOrderCount}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </AdminLayout>
  );
};

export default Page;
