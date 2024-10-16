import { Divider, Grid, Stack, Typography, Box, styled } from "@mui/material";
import AppLayout from "components/app/AppLayout";
import Payment from "components/app/sessions/Payment";
import SectionCreator from "components/app/User-profile/SectionCreator";
import { StyledBorderBox } from "components/app/User-profile/StyledComponents";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByCategoryAction } from "redux-store/products/byCategory.slice";
import StarIcon from "@mui/icons-material/Star";
import ReactHtmlParser from "react-html-parser";
import Slider from "react-slick";
import OrderForm from "components/app/OrderForm";
import { getSingleProduct } from "api/requests";
import SkuSelect from "components/app/SKU-SELECT";

const StyledImg = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "580px",
  borderRadius: "5px",
  [theme.breakpoints.down("sm")]: {
    height: "350px",
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  ".slick-list": {
    overflowX: "scroll",
    width: "100%",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "::-moz-scrollbar": {
      display: "none",
    },
  },
  ".slick-slide": {
    width: "130px !important",
  },
}));

const Page = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const productName = product?.title[router?.locale ? router?.locale : "uz"];
  const [slider1, setSlider1] = React.useState(null);
  const [slider2, setSlider2] = React.useState(null);
  const [selectedSkus, setSku] = React.useState([]);
  const products = useSelector((state) => state?.productsByCategory?.data);

  React.useEffect(() => {
    dispatch(getByCategoryAction(product?.category?.uid));
  }, [router.query?.id, product.category]);

  const selectedVariant = router?.query?.skuid
    ? product?.skuList?.find(
        (item) => item?.uid === parseInt(router?.query?.skuid)
      )
    : product?.skuList[0];
  return (
    <AppLayout>
      <Stack my={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} mr={2}>
            <Box>
              <Slider
                asNavFor={slider2}
                arrows={false}
                ref={(slider) => setSlider1(slider)}
              >
                {product?.video ? (
                  <Box
                    component="video"
                    src={product?.video}
                    sx={{
                      width: "100%",
                      height: { xs: "350px", md: "500px" },
                      borderRadius: "5px",
                      objectFit: "cover",
                    }}
                    controls
                    autoPlay
                  />
                ) : null}
                {product.images?.map((item) => (
                  <StyledImg
                    key={item["image"][800]["high"]}
                    component="img"
                    src={item["image"][800]["high"]}
                  />
                ))}
              </Slider>
            </Box>
            <StyledBorderBox
              sx={{
                border: "none",
                "& .slick-track": {
                  width: product.images > 1 ? "auto !important" : "auto",
                },
              }}
            >
              {product.images?.length > 1 ? (
                <StyledSlider
                  asNavFor={slider1}
                  ref={(slider) => setSlider2(slider)}
                  slidesToShow={product?.images?.length}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {product?.video ? (
                    <StyledBorderBox p={1}>
                      <Box
                        component="video"
                        src={product?.video}
                        sx={{
                          width: "100%",
                          height: "100px",
                          borderRadius: "5px",
                          objectFit: "cover",
                        }}
                        controls
                        autoPlay
                      />
                    </StyledBorderBox>
                  ) : null}
                  {product.images?.map((item) => (
                    <StyledBorderBox p={1} key={item}>
                      <Box
                        component="img"
                        src={item["image"][800]["high"]}
                        sx={{
                          width: "100%",
                          height: "100px",
                          borderRadius: "5px",
                          objectFit: "cover",
                        }}
                      />
                    </StyledBorderBox>
                  ))}
                </StyledSlider>
              ) : (
                ""
              )}
            </StyledBorderBox>
          </Grid>
          <Grid xs={12} md={4.5} ml={{ xs: 2, md: 0 }}>
            <Stack mt={3} direction="row" alignItems="center" mb={1}>
              <Stack direction="row" alignItems="center">
                <StarIcon fontSize="small" sx={{ color: "#a30041" }} />
                <Typography ml={0.3} component="span" variant="string">
                  {product?.rating?.toFixed(1)}
                </Typography>
                <Typography ml={1} component="a" href="/" variant="string">
                  ( {product?.reviewsAmount} dona baho )
                </Typography>
              </Stack>
              <Typography ml={2} component="a" href="/" variant="string">
                {product?.quantitySold} dona buyurtma
              </Typography>
            </Stack>
            <Stack>
              <Typography
                color="text.legacy"
                component="h3"
                variant="h5"
                sx={{ fontWeight: 400 }}
                my={1}
              >
                {productName[0]?.toUpperCase() +
                  productName?.slice(1)?.toLowerCase()}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <Typography variant="string">Sotuvchi:</Typography>
                <Typography
                  variant="string"
                  component="a"
                  href="/"
                  sx={{
                    position: "relative",
                    "::after": {
                      content: `""`,
                      position: "absolute",
                      background: "#000000",
                      height: "1px",
                      width: "100%",
                      bottom: 0,
                      left: 0,
                    },
                  }}
                >
                  Chegirma
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="string">Yetkazib berish:</Typography>
                <Typography variant="string">2 kun ichida</Typography>
              </Stack>
            </Stack>
            <Stack mb={2}>
              {product?.characteristics?.map((char) => (
                <Stack key={char?.uid} mb={3}>
                  <Typography mb={1}>{char?.title[router?.locale]}</Typography>
                  <SkuSelect
                    list={char?.values}
                    selectSKU={setSku}
                    selectedSkus={selectedSkus}
                    charLength={product?.characteristics?.length}
                    skuList={product?.skuList}
                  />
                </Stack>
              ))}
            </Stack>
            <StyledBorderBox
              py={5}
              px={2}
              sx={{ backgroundColor: "background.lightPurple" }}
            >
              <Typography
                textAlign={{ xs: "left", md: "center" }}
                variant="h6"
                my={2}
              >
                Buyurtma berish
              </Typography>
              <OrderForm
                isShop={true}
                product={product}
                variantId={selectedVariant?.uid}
                positions={product?.positions || []} // Pass positions as a prop
              />
            </StyledBorderBox>
          </Grid>
          <Grid item xs={12}>
            <StyledBorderBox px={3} py={2}>
              <Typography variant="h5" color="text.main">
                {product?.title[router?.locale]}
              </Typography>
              <Typography variant="h5" color="info.700">
                {selectedVariant?.purchasePrice?.toLocaleString()} so&apos;m
              </Typography>
              <Divider sx={{ borderWidth: "1.3px", my: 2 }} />
              <Typography variant="h6" color="text.main">
                Mahsulot haqida
              </Typography>
              <Box sx={{ fontSize: "13px", fontWeight: 500 }}>
                {ReactHtmlParser(product?.description[router?.locale])}
              </Box>
            </StyledBorderBox>
          </Grid>
        </Grid>

        <SectionCreator name="O'xshash mahsulotlar" data={products} />
      </Stack>
    </AppLayout>
  );
};

export default Page;

export const getServerSideProps = async (ctx) => {
  const res = await getSingleProduct(ctx.query.id);

  if (res) {
    return {
      props: { product: res },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
