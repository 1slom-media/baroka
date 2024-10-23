import { Divider, Grid, Stack, Typography, Box, styled } from "@mui/material";
import AppLayout from "components/app/AppLayout";
import { StyledBorderBox } from "components/app/User-profile/StyledComponents";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByCategoryAction } from "redux-store/products/byCategory.slice";
import ReactHtmlParser from "react-html-parser";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";
import OrderForm from "components/app/OrderForm";
import { getProductByStreamId } from "api/requests";
import { useRouter } from "next/router";

const StyledImg = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
  borderRadius: "7px",
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

const Page = ({ product, stream }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [slider1, setSlider1] = React.useState(null);
  const [slider2, setSlider2] = React.useState(null);
  const products = useSelector((state) => state.productsByCategory.data);
  const selectedVariant = router?.query?.skuid
    ? product?.skuList?.find(
        (item) => item?.uid === parseInt(router?.query?.skuid)
      )
    : product?.skuList[0];
  const productName = product?.title[router?.locale ? router?.locale : "uz"];

  React.useEffect(() => {
    if (product?.category) {
      dispatch(getByCategoryAction(product.category?.uid));
    }
  }, [product?.category, product]);

  return (
    <AppLayout>
      <Stack my={4}>
        <Grid container>
          {/* block 1 */}
          <Grid item xs={12} md={7}>
            <StyledBorderBox>
              <Slider
                asNavFor={slider2}
                arrows={false}
                ref={(slider) => setSlider1(slider)}
              >
                {product?.video ? (
                  <StyledImg component="video" src={product?.video} controls />
                ) : null}
                {product?.images?.map((item) => (
                  <StyledImg
                    key={item}
                    component="img"
                    src={item["image"][800]["high"]}
                  />
                ))}
              </Slider>
            </StyledBorderBox>
            <StyledBorderBox
              sx={{
                border: "none",
                "& .slick-track": {
                  width:
                    product?.images?.length > 1 ? "auto !important" : "auto",
                },
              }}
            >
              {product?.images?.length > 1 ? (
                <StyledSlider
                  asNavFor={slider1}
                  ref={(slider) => setSlider2(slider)}
                  slidesToShow={product?.images?.length}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {product?.images?.map((item) => (
                    <StyledBorderBox key={item}>
                      <Box
                        component="img"
                        src={item["image"][540]["low"]}
                        sx={{
                          width: "60px",
                          height: "60px",
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

          {/* block 2 */}

          <Grid item xs={12} md={5}>
            <Stack px={{ xs: 0, md: 3 }}>
              <StyledBorderBox>
                <Stack direction="row" alignItems="center">
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
                {product?.characteristics?.length > 0 && (
                  <Stack mb={2}>
                    {product?.characteristics?.map((char) => (
                      <Stack key={char?.uid} mb={3}>
                        <Typography mb={1}>
                          {char?.title[router?.locale]}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </StyledBorderBox>
              <Typography textAlign="center" variant="h6" my={2}>
                Buyurtma berish
              </Typography>
              <StyledBorderBox
                py={5}
                px={{ xs: 1, md: 2 }}
                sx={{ backgroundColor: "background.lightPurple" }}
              >
                <OrderForm
                  streamId={stream._id}
                  isShop
                  variantId={selectedVariant?.uid}
                  isRegionOn={stream?.isRegionOn}
                />
              </StyledBorderBox>
            </Stack>
          </Grid>

          {/* block 3 */}

          <Grid item xs={12}>
            <StyledBorderBox py={2}>
              {product?.title && (
                <Typography variant="h5" color="text.main">
                  {product?.title[router?.locale]}
                </Typography>
              )}

              {selectedVariant?.purchasePrice && (
                <Typography variant="h5" color="info.700">
                  {selectedVariant?.purchasePrice.toLocaleString()} so&apos;m
                </Typography>
              )}
              <Divider sx={{ borderWidth: "1.3px", my: 2 }} />
              <Typography variant="h6" color="text.main">
                Mahsulot haqida
              </Typography>
              {product?.description && (
                <Box sx={{ fontSize: "13px", fontWeight: 500 }}>
                  {ReactHtmlParser(product?.description[router?.locale])}
                </Box>
              )}
            </StyledBorderBox>
          </Grid>

        </Grid>
      </Stack>
    </AppLayout>
  );
};

export default Page;

export const getServerSideProps = async (ctx) => {
  const res = await getProductByStreamId(ctx.query.id);
  if (res) {
    return {
      props: {
        product: res?.payload?.product,
        stream: {
          _id: res?.payload?._id,
        },
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
