import AdminLayout from "components/app/AppLayout/AdminLayout";
import React, { useState } from "react";
import Head from "next/head";
import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import TableHeader from "components/general/TableHead";
import CloseIcon from "@mui/icons-material/Close";
import heading from "constants/userStatisticsHeading";
import Pagination from "@mui/material/Pagination";
import { getUserStats, setLimit } from "redux-store/statistics/get.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import UserStatsRow from "components/app/TableRows/statisticsRow";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import TableSkeletonLoader from "components/skeleton-loader/tableLoader";
import SearchIcon from "@mui/icons-material/Search";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import useWindowSize from "hooks/useWindowSize"; //contrastText

const StyledCardWrapper = styled(Card)(({ theme }) => ({
  background: "transparent",
  padding: "10px",
  borderRadius: "3px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
}));

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [query, setQuery] = useState(null);
  const [cancel, setCancel] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const screenWidth = useWindowSize();
  const { list, countPage, isLoading, details, limit } = useSelector(
    (state) => state.userStats
  );
  const [page, setPage] = React.useState(1);

  const handleChangePage = (_, prop) => {
    setPage(prop);
  };

  const handleChange = (event) => {
    dispatch(setLimit(event.target.value));
    dispatch(getUserStats({ token, page: 1, limit: event.target.value }));
  };

  const handleSearch = () => {
    if (query) {
      setCancel(true);
      dispatch(getUserStats({ token, page: 1, limit: limit, filter: query }));
    }
  };

  const handleClose = () => {
    setCancel(false);
    setQuery("");
    dispatch(getUserStats({ token, page: 1, limit: limit }));
  };

  React.useEffect(() => {
    if (token) {
      dispatch(getUserStats({ token, page, limit: limit }));
    } else {
      router.push("/");
    }
  }, [token, page]);

  return (
    <AdminLayout>
      <Head>
        <title>Chegirma marketing</title>
      </Head>
      <Stack mb={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="string" color="text.white" mb={2}>
            Umumiy Statistikalar
          </Typography>
        </Stack>
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
              <InputLabel sx={{ color: "#fff" }} id="demo-simple-select-label">
                Qatorlar soni
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label="Age"
                onChange={handleChange}
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
                label="Oqim raqami"
                placeholder="Oqim raqami"
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
        {isLoading ? (
          <TableSkeletonLoader />
        ) : !list.length || list.length == 0 ? (
          <EmptyPageWrapper>
            <EmptyCard
              btnText="Ortga qaytish"
              img="/assets/empty/stream1.png"
              btn={true}
              txt="Hozircha sizda hech qanday statistika mavjud emas!"
              path="/"
            />
          </EmptyPageWrapper>
        ) : (
          <StyledCardWrapper>
            <TableContainer
              sx={{ width: { xs: screenWidth - 55, md: "100%" } }}
            >
              <Table>
                <TableHeader hideSelectBtn heading={heading} />
                <TableBody>
                  {list.map((item) => (
                    <UserStatsRow key={item._id} {...item} />
                  ))}
                  <StyledTableRow sx={{ backgroundColor: "primary.main" }}>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography>UMUMIY</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography>STATISTIKA</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography>{details?.visits_count}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>{details["new"]}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>{details["ready"]}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>{details["onway"]}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>{details["delivered"]}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>{details["pending"]}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>{details["hold"]}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>{details["canceled"]}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography>{details["archived"]}</Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Stack my={4} alignItems="center">
              <Pagination
                color="primary"
                page={page}
                onChange={handleChangePage}
                count={countPage}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </StyledCardWrapper>
        )}
      </Stack>
    </AdminLayout>
  );
};

export default Page;
