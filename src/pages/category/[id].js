import { Box, Stack } from "@mui/material";
import AppLayout from "components/app/AppLayout";
import CategoryCard from "components/general/Cards/CategoryCard";
import ProductCard from "components/general/Cards/ProductCard";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getByCategoryAction } from "redux-store/products/byCategory.slice";

const Page = () => {
  const data = useSelector((state) => state.productsByCategory.data);
  const categories = useSelector((state) => state.categories.list);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getByCategoryAction(router.query.id));
  }, [router.query.id]);
  return (
    <AppLayout>
      <Stack my={2} pb={{ xs: 1.4, md: 0 }} direction="row" overflow="auto">
        <Stack
          direction="row"
          spacing={4}
          justifyContent="flex-start"
          overflowX="auto"
          width="100%"
        >
          {categories.map((item) => (
            <CategoryCard
              {...item}
              key={item._id}
              isActive={router.query.id == item.uid}
            />
          ))}
        </Stack>
      </Stack>
      <Box>
        {data?.length ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
              mt: 2,
              mb: 2,
            }}
            gap={{ xs: 1, md: 0 }}
          >
            {data?.map((item) => (
              <ProductCard {...item} key={item._id} />
            ))}
          </Box>
        ) : (
          <EmptyPageWrapper>
            <EmptyCard
              btn={true}
              btnText="Ortga qaytish"
              img="/assets/empty/category.png"
              path="/"
              txt="Ushbu kategoriyada hozircha mahsulot mavjud emas!"
            />
          </EmptyPageWrapper>
        )}
      </Box>
    </AppLayout>
  );
};

export default Page;
