import Head from "next/head";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import TableHeader from "components/general/TableHead";
import heading from "constants/userRequestsHeading";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getUserRequests, setLimit } from "redux-store/requests/get.slice";
import UserRequestsRow from "components/app/TableRows/requestsRow";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import TableSkeletonLoader from "components/skeleton-loader/tableLoader";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import useWindowSize from "hooks/useWindowSize";

const Page = () => {
  const [page, setPage] = React.useState(1);
  const router = useRouter();
  const [query, setQuery] = React.useState(null);
  const [cancel, setCancel] = React.useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const reqs = useSelector((state) => state.userReqs);

  const handleSearch = () => {
    if (query) {
      setCancel(true);
      dispatch(
        getUserRequests({ token, page: 1, limit: reqs.limit, filter: query })
      );
    }
  };

  const screenWidth = useWindowSize();

  const handleClose = () => {
    setCancel(false);
    setQuery("");
    dispatch(getUserRequests({ token, page: 1, limit: reqs.limit }));
  };

  const handleRowChange = (event) => {
    dispatch(setLimit(event.target.value));
    dispatch(getUserRequests({ token, page: 1, limit: event.target.value }));
  };

  const handleChangePage = (_, p) => {
    setPage(p);
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserRequests({ token, page, limit: reqs.limit }));
    } else {
      router.push("/");
    }
  }, [token, page]);
  return (
    <AdminLayout>
      <Head>
        <title>Chegirma marketing</title>
      </Head>
      <Stack>
        <Typography mb={2} variant="string" color="text.white">
          So`rovlar tarixi
        </Typography>
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
                value={reqs.limit}
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
        </Box>
      </Stack>
      <Box
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "3px",
          height: "100%",
          width: "100%",
        }}
      >
        <Stack mt={{ xs: 2, md: 2 }}>
          {reqs?.isLoading ? (
            <TableSkeletonLoader />
          ) : !reqs?.list?.length || reqs?.list?.length == 0 ? (
            <EmptyPageWrapper>
              <EmptyCard
                btnText="Ortga qaytish"
                img="/assets/media/requestEmpty.png"
                btn={true}
                txt="So`rovlar mavjud emas!"
                path="/"
              />
            </EmptyPageWrapper>
          ) : (
            <Box sx={{ p: 2 }}>
              <TableContainer
                sx={{ width: { xs: screenWidth - 70, sm: 500, md: "100%" } }}
              >
                <Table>
                  <TableHeader hideSelectBtn heading={heading} />
                  <TableBody>
                    {reqs?.list?.map((item) => (
                      <UserRequestsRow
                        key={item._id}
                        {...item}
                        sx={{ marginBottom: "10px" }}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack my={4} alignItems="center">
                {reqs.pageCount > 1 ? (
                  <Pagination
                    color="primary"
                    onChange={handleChangePage}
                    count={reqs.pageCount}
                    variant="outlined"
                    shape="rounded"
                  />
                ) : (
                  ""
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </AdminLayout>
  );
};

export default Page;
