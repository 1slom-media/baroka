import { Box, Grid, Stack, Typography } from "@mui/material";
import ProductCard from "components/general/Cards/ProductCard";
import React from "react";
import ProductSkeleton from "../ProductSkeleton";

const SectionCreator = ({ name, data, isLoading }) => {
  return (
    <Stack my={2}>
      <Stack justifyContent="flex-start">
        <Typography variant="body2" color="text.main">
          {name}
        </Typography>
      </Stack>
      <Stack mt={2}>
        <Grid container spacing={1}>
          {isLoading
            ? Array(20)
                .fill()
                .map((_, indx) => {
                  return (
                    <Grid item xs={6} sm={4} md={2.4} key={indx}>
                      <ProductSkeleton />
                    </Grid>
                  );
                })
            : data?.map((item) => (
                <Grid item xs={6} sm={4} md={2.4} key={item.uid}>
                  <ProductCard {...item} />
                </Grid>
              ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default SectionCreator;
