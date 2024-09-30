import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMarketPagination } from "redux-store/products/marketPagination.slice";
import { Box, Grid, Pagination, Stack, Chip, Button } from "@mui/material";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import ProductCard from "components/general/Cards/ProductCard2";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import MobileSearchInput from "components/general/Inputs/MobileSearchBar";
import SkeletonCardLoader from "components/skeleton-loader/CardLoader";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";

const Page = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.marketPagination);

  const router = useRouter();

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (event, newValue) => {
    setPage(newValue);
  };

  useEffect(() => {
    dispatch(getMarketPagination({ page, filter: router?.query?.searchQuery }));
  }, [page, router?.query]);

  return (
    <AdminLayout isDifferentSearch>
      <Head>
        <title>Chegirma marketing</title>
      </Head>

      <Box
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "3px",
          height: "100%",
          width: "100%",
          p: 2,
        }}
      >
        <Stack mb={2}>
          <Grid spacing={2} container>
            <Grid xs={4} sm={3} md={1.4} item>
              <Link href={`/profile/market`}>
                <Chip
                  sx={{ cursor: "pointer" }}
                  label="Barchasini ko'rish"
                  variant="outlined"
                  color="primary"
                />
              </Link>
            </Grid>
          </Grid>
        </Stack>
        <Stack my={2} direction="row" alignItems="center" spacing="10px">
          <MobileSearchInput
            onChange={handleSearch}
            query={query}
            placeholder="Mahsulot qidirish"
            loading={data?.isLoading}
            sx={{ color: "white" }}
            isDark
          />
          <Button
            onClick={() =>
              router.push(`/profile/market/search?searchQuery=${query}`)
            }
            color="primary"
            variant="contained"
          >
            <SearchIcon />
          </Button>
        </Stack>
        <Stack mt={{ xs: 4, md: 2 }}>
          {data?.isLoading && !data.list.length ? (
            <Grid container spacing={{ xs: 1 }}>
              {[1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((item) => {
                return (
                  <Grid key={item._id} item xs={6} sm={4} md={3} lg={2.4}>
                    <SkeletonCardLoader {...item} />
                  </Grid>
                );
              })}
            </Grid>
          ) : data.list.length > 0 ? (
            <Grid container spacing={{ xs: 1 }}>
              {data.list?.map((item) => {
                return (
                  <Grid key={item._id} item xs={6} sm={4} md={3} lg={2.4}>
                    <ProductCard {...item} />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <EmptyPageWrapper>
              <EmptyCard
                btn={true}
                path="/"
                txt="Mahsulot mavjud emas !"
                btnText="Orqaga qaytish "
                img="/assets/empty/steam.png"
              />
            </EmptyPageWrapper>
          )}
        </Stack>
        <Stack my={4} alignItems="center">
          {data?.pageCount > 1 ? (
            <Pagination
              color="primary"
              onChange={handlePageChange}
              count={data.pageCount}
              variant="outlined"
              shape="rounded"
            />
          ) : null}
        </Stack>
      </Box>
    </AdminLayout>
  );
};

export default Page;
