import {
  Grid,
  styled,
  Box,
  Typography,
  MenuItem,
  TextField,
  Stack,
  Table,
  TableContainer,
  TableBody,
  Card,
  IconButton,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserPaymentsHistory, setLimit } from "redux-store/payment/payment.slice";
import Payment from "components/app/sessions/Payment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import UserPaymentsRow from "components/app/TableRows/PaymentsRow";
import TableHeader from "components/general/TableHead";
import heading from "constants/userPaymentsHeading";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import TableSkeletonLoader from "components/skeleton-loader/tableLoader";
import useWindowSize from "hooks/useWindowSize";

const StyledCardWrapper = styled(Card)(({ theme }) => ({
  background: "transparent",
  padding: "10px",
  borderRadius: "10px",
}));

const FirstBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  background: "transparent",
  padding: "20px",
}));

const StyledPaymentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "15px 20px",
  background: "transparent",
  width: "50%",
  gap: "25px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.data.user);
  const list = useSelector((state) => state.userPayments.history);
  const limit = useSelector((state) => state.userPayments.limit);
  const isLoading = useSelector((state) => state.userPayments.isLoading);
  const [query, setQuery] = React.useState(null);
  const [cancel, setCancel] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const screenWidth = useWindowSize();

  const handleSearch = () => {
    if (query) {
      setCancel(true);
      dispatch(
        getUserPaymentsHistory({ token, page: 1, limit: limit, filter: query })
      );
    }
  };

  const handleClose = () => {
    setCancel(false);
    setQuery("");
    dispatch(getUserPaymentsHistory({ token, page: 1, limit: limit }));
  };

  const handleRowChange = (event) => {
    dispatch(setLimit(event.target.value));
    dispatch(
      getUserPaymentsHistory({ token, page: 1, limit: event.target.value })
    );
  };

  React.useEffect(() => {
    if (token) {
      dispatch(getUserPaymentsHistory({ token, limit, page }));
    } else {
      router.push("/");
    }
  }, [token, page]);
  return (
    <AdminLayout>
      <Stack>
        <Typography mb={2} variant="string" color="text.white">
          To&apos;lov uchun so&apos;rov jo&apos;natish
        </Typography>

        <Box
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "3px",
            height: "100%",
            width: "100%",
            pb: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center">
                <StyledPaymentBox
                  borderRadius={{ xs: "10px", lg: "10px 0 0 10px" }}
                  borderRight={{
                    xs: "none",
                    lg: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                  mb={{ xs: "10px", lg: "0px" }}
                >
                  <Typography variant="body1" color="text.whiteOff">
                    Asosiy balans:
                  </Typography>
                  <Typography
                    variant="body2"
                    color={
                      user?.balance && user?.balance < 0
                        ? "error.main"
                        : "primary"
                    }
                  >
                    {user?.balance?.toLocaleString()} so&apos;m
                  </Typography>
                </StyledPaymentBox>
                <StyledPaymentBox
                  borderRadius={{ xs: "10px", lg: "0 10px 10px 0" }}
                >
                  <Typography variant="body1" color="text.whiteOff">
                    To`lab berildi:
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {user?.paid?.toLocaleString()} so&apos;m
                  </Typography>
                </StyledPaymentBox>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack p={2}>
                <Payment />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <Stack mt={3}>
        <Typography mb={2} variant="string" color="text.white">
          To&apos;lovlar tarixi
        </Typography>
        <Stack>
          <Box
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "3px",
              height: "100%",
              width: "100%",
              p: 2,
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
                  value={limit}
                  label="Age"
                  onChange={handleRowChange}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" alignItems="center" gap="5px">
                <TextField
                  size="small"
                  label="Tranzaksiya raqami"
                  placeholder="Tranzaksiya raqami"
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
          </Box>
        </Stack>
        <Box
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "3px",
            height: "100%",
            width: "100%",
            p: {xs: 0, md: 2},
          }}
        >
          {isLoading ? (
            <TableSkeletonLoader />
          ) : !list?.payments?.length || list?.payments?.length == 0 ? (
            <EmptyCard
              path="/"
              img="/assets/empty/stream1.png"
              btnText="Bosh sahifaga qaytish"
              txt="To'lovlar  tarixi  mavjud emas"
              isDark
            />
          ) : (
            <StyledCardWrapper>
              <TableContainer sx={{ width: { xs: screenWidth - 70, sm: 500, md: "100%" } }}>
                <Table>
                  <TableHeader
                    hideSelectBtn
                    heading={heading}
                    rowCount={list?.payments?.length}
                    sx={{ marginBotom: "10px" }}
                  />
                  <TableBody>
                    {list?.payments.map((item) => (
                      <UserPaymentsRow key={item._id} {...item} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledCardWrapper>
          )}
        </Box>
      </Stack>
    </AdminLayout>
  );
};

export default Page;
