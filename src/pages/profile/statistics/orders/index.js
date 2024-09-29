import {
  Pagination,
  Stack,
  Box,
  Typography,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Chip,
} from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAdminOrders,
  setOrdersLimit,
} from "redux-store/statistics/get.slice";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TableSkeletonLoader from "components/skeleton-loader/tableLoader";
import EmptyDataComponent from "components/app/User-profile/EmptyDataComponent";
import OrderTabs from "components/app/User-profile/OrderTabs";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import { getColor, getStatusText } from "utils/helpers";
import useWindowSize from "hooks/useWindowSize";
//contrastText
const Page = () => {
  const [query, setQuery] = useState(null);
  const [cancel, setCancel] = useState(false);
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const list = useSelector((state) => state.userStats.orders);
  const ordersLimit = useSelector((state) => state.userStats.ordersLimit);
  const isOrdersLoading = useSelector(
    (state) => state.userStats.isOrdersLoading
  );
  const orderPagesCount = useSelector(
    (state) => state.userStats.orderPagesCount
  );

  const screenWidth = useWindowSize();

  const handleChange = (event) => {
    dispatch(setOrdersLimit(event.target.value));
    router.push(
      `/profile/statistics/orders?status=${
        router?.query?.status ? router?.query?.status : "new"
      }&page=1&limit=${event.target.value}`
    );
  };

  const handleSearch = () => {
    if (query) {
      setCancel(true);
      dispatch(
        getAdminOrders({
          token,
          params: {
            limit: ordersLimit,
            status: router?.query?.status ? router?.query?.status : "new",
            page: 1,
          },
        })
      );
    }
  };

  const handleClose = () => {
    setCancel(false);
    setQuery("");
    dispatch(
      getAdminOrders({
        token,
        params: {
          limit: ordersLimit,
          status: router?.query?.status ? router?.query?.status : "new",
          page: 1,
        },
      })
    );
  };

  const dispatch = useDispatch();

  const handleChangePage = (event, newValue) => {
    router.push(
      `/profile/statistics/orders?status=${
        router?.query?.status ? router?.query?.status : "new"
      }&page=${newValue}&limit=${ordersLimit}`
    );
  };

  React.useEffect(() => {
    if (token && router?.query) {
      dispatch(
        getAdminOrders({
          token,
          params: {
            limit: ordersLimit,
            status: router?.query?.status ? router?.query?.status : "new",
            page: router?.query?.page ? router?.query?.page : 1,
          },
        })
      );
    } else {
      router.push("/");
    }
  }, [token, router?.query]);
  return (
    <AdminLayout>
      <Stack pb={3}>
        <Typography variant="string" color="text.white" mb={2}>
          Umumiy Buyurtmalar
        </Typography>
        <Stack>
          <Box
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "3px",
              height: "100%",
              width: "100%",
              p: 2,
              pb: 0,
              mb: 2,
            }}
          >
            <Stack direction="row" alignItems="center" gap="10px">
              <FormControl
                sx={{
                  width: "120px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "6px",
                  color: "#fff",
                }}
                size="small"
              >
                <InputLabel
                  sx={{ color: "#fff" }}
                  id="demo-simple-select-label"
                >
                  Qatorlar soni
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ordersLimit}
                  label="Age"
                  onChange={handleChange}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" alignItems="center" gap="5px">
                <TextField
                  size="small"
                  label="Buyurtma raqami"
                  placeholder="Buyurtma raqami"
                  type="number"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                  }}
                  InputProps={{
                    sx: {
                      color: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                    },
                  }}
                />
                {!cancel ? (
                  <IconButton color="primary" onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ) : (
                  <IconButton color="error" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                )}
              </Stack>
            </Stack>
            <Stack mt={2} sx={{ width: { xs: screenWidth - 70, md: "100%" } }}>
              <OrderTabs />
            </Stack>
          </Box>
        </Stack>
        <Box
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "3px",
            height: "100%",
            width: "100%",
            p: { xs: 1, md: 2 },
            pb: 2,
            mb: 3,
          }}
        >
          {isOrdersLoading ? (
            <Stack>
              <TableSkeletonLoader />
            </Stack>
          ) : !isOrdersLoading && list.length ? (
            <Stack>
              <Stack>
                <Grid container spacing={2}>
                  {list?.map((order) => (
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
                                    "dd-MMMM, yyyy HH:mm",
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
                              <Typography
                                variant="string"
                                color="text.whiteOff"
                              >
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
                            {order?.message
                              ? order?.message
                              : "Xabar qoldirilmagan"}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="center" mt={4}>
                {orderPagesCount > 1 ? (
                  <Pagination
                    color="primary"
                    page={
                      router?.query?.page ? parseInt(router?.query?.page) : 1
                    }
                    onChange={handleChangePage}
                    count={orderPagesCount}
                    variant="outlined"
                    shape="rounded"
                  />
                ) : null}
              </Stack>
            </Stack>
          ) : (
            <Stack>
              <EmptyDataComponent text={"Mavjud buyurtmalar topilmadi"} />
            </Stack>
          )}
        </Box>
      </Stack>
    </AdminLayout>
  );
};

export default Page;
