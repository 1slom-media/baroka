import { Box, Grid, Stack, styled } from "@mui/material";
import AppLayout from "components/app/AppLayout";
import CategoryCard from "components/general/Cards/CategoryCard";
import ProductCard from "components/general/Cards/ProductCard";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTopProductsAsync } from "redux-store/products/top.slice";

const StyledCatStack = styled(Stack)(({ theme }) => ({
  padding: "10px",
  "::-webkit-scrollbar": {
    height: "8px",
  },

  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#888",
  },

  /* Handle on hover */
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  [theme.breakpoints.down("sm")]: {
    "::-webkit-scrollbar": {
      height: "3px",
    },
  },
}));

const Page = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const topProducts = useSelector((state) => state.topProducts.list);

  React.useEffect(() => {
    dispatch(getTopProductsAsync());
  }, []);
  return (
    <AppLayout>
      <Stack
        my={2}
        direction="row"
        overflow="auto"
        bgcolor="background.veryLightPurple"
      >
        <StyledCatStack
          direction="row"
          spacing={4}
          justifyContent="flex-start"
          overflowX="auto"
          width="100%"
        >
          {categories.map((item) => (
            <CategoryCard {...item} key={item._id} />
          ))}
        </StyledCatStack>
      </Stack>
      <Stack mt={3}>
        <Grid container spacing={2}>
          {topProducts?.map((item) => (
            <Grid item key={item.uid} xs={6} sm={4} md={2.4}>
              <ProductCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </AppLayout>
  );
};

export default Page;
