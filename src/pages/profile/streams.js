import {
  Grid,
  Pagination,
  Stack,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import StreamCard from "components/general/Cards/StreamCard";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import SkeletonCardLoader from "components/skeleton-loader/CardLoader";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserStreams, setLimit } from "redux-store/stream/get.slice";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import EmptyDataComponent from "components/app/User-profile/EmptyDataComponent";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState(null);
  const [cancel, setCancel] = React.useState(false);
  const token = useSelector((state) => state.auth.token);
  const streams = useSelector((state) => state.streamsGet.list);
  const limit = useSelector((state) => state.streamsGet.limit);
  const isLoading = useSelector((state) => state.streamsGet.isLoading);
  const [page, setPage] = React.useState(1);

  const handleSearch = () => {
    if (query) {
      setCancel(true);
      dispatch(getUserStreams({ token, page: 1, limit: limit, filter: query }));
    }
  };

  const handleClose = () => {
    setCancel(false);
    setQuery("");
    dispatch(getUserStreams({ token, page: 1, limit: limit }));
  };

  const handleRowChange = (event) => {
    dispatch(setLimit(event.target.value));
    dispatch(getUserStreams({ token, page: 1, limit: event.target.value }));
  };

  const handleChange = (e, p) => {
    setPage(p);
  };

  const [isActive, setIsActive] = React.useState("");

  React.useEffect(() => {
    if (token) {
      dispatch(getUserStreams({ token, page }));
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="string" color="text.white" mb={2}>
            Mavjud oqimlar
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
        <Stack>
          {isLoading ? (
            <Grid container spacing={2}>
              {[1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((item) => {
                return (
                  <Grid key={item._id} item xs={12} md={6} xl={3}>
                    <Stack>
                      <SkeletonCardLoader {...item} />
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          ) : !streams?.streams?.length || streams?.streams?.length == 0 ? (
            <Stack>
              <EmptyDataComponent text="Malumotlar topilmadi" />
            </Stack>
          ) : (
            <Grid container spacing={2}>
              {streams?.streams?.map((item) => {
                return (
                  <Grid
                    position="relative"
                    key={item._id}
                    item
                    xs={12}
                    md={6}
                    xl={3}
                  >
                    <StreamCard
                      isActive={isActive}
                      setIsActive={setIsActive}
                      {...item}
                      page={page}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Stack>
      </Stack>
      {streams?.countPage > 1 ? (
        <Stack my={4} alignItems="center">
          <Pagination
            color="primary"
            onChange={handleChange}
            count={streams?.countPage}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      ) : null}
    </AdminLayout>
  );
};

export default Page;
