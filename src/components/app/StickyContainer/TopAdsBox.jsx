import { Box, Button, Stack, styled, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

const StyledStack = styled(Stack)(({ theme }) => ({
  background: "linear-gradient(155.28deg, #383638 9.94%, #000000 43.76%)",
  height: "400px",
  width: "100%",
  borderRadius: "30px",
  flexDirection: "row",
  "& .right-side": {
    backgroundImage: "url('/assets/iphone.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
  },
  "& .mdBl": {
    maxWidth: "145px",
  },
  "& .xsBl": {
    maxWidth: "145px",
    display: "none",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "auto",
    "& .mdBl": {
      display: "none",
    },
    "& .xsBl": {
      display: "block",
      marginTop: "10%",
    },
    "& .right-side": {
      height: "150px",
      backgroundSize: "50% 100%",
      backgroundPosition: "bottom right",
    },
  },
}));

const TopAdsBox = () => {
  const settings = {
    dots: false,
    // infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {fakeData.map((item, key) => (
        <StyledStack
          key={item.title}
          mt={2}
          sx={{ display: "flex !important" }}
          justifyContent="space-evenly"
          px={{ xs: 2, md: 2 }}
          py={{ xs: 2, md: 0 }}
        >
          <Stack
            width={{ md: "40%", xs: "100%" }}
            height="100%"
            direction="column"
            justifyContent="space-evenly"
          >
            <Typography variant="h3" color="text.200">
              {item.title}
            </Typography>
            <Typography variant={{ md: "body2", xs: "body1" }} color="text.200">
              {item.text}
            </Typography>
            <Button className="mdBl" color="primary" variant="contained">
              Sotib olish
            </Button>
          </Stack>
          <Stack
            width={{ md: "40%", xs: "100%" }}
            height="100%"
            className="right-side"
            position="relative"
          >
            <Button className="xsBl" color="primary" variant="contained">
              Sotib olish
            </Button>
          </Stack>
        </StyledStack>
      ))}
    </Slider>
  );
};

export default TopAdsBox;

const fakeData = [
  {
    title: "Discover Most Suitable Watches",
    text: "Find the best, reliable, and cheap smart watches here. We focus on product quality. Here you can find smart watches of almost all brands. So why you are waiting? Just order now!",
    id: "1",
    img: "/assets/iphone.png",
  },
  {
    title: "Discover Most Suitable Watches",
    text: "Find the best, reliable, and cheap smart watches here. We focus on product quality. Here you can find smart watches of almost all brands. So why you are waiting? Just order now!",
    id: "2",
    img: "/assets/iphone.png",
  },
  {
    title: "Discover Most Suitable Watches",
    text: "Find the best, reliable, and cheap smart watches here. We focus on product quality. Here you can find smart watches of almost all brands. So why you are waiting? Just order now!",
    id: "3",
    img: "/assets/iphone.png",
  },
  {
    title: "Discover Most Suitable Watches",
    text: "Find the best, reliable, and cheap smart watches here. We focus on product quality. Here you can find smart watches of almost all brands. So why you are waiting? Just order now!",
    id: "4",
    img: "/assets/iphone.png",
  },
  {
    title: "Discover Most Suitable Watches",
    text: "Find the best, reliable, and cheap smart watches here. We focus on product quality. Here you can find smart watches of almost all brands. So why you are waiting? Just order now!",
    id: "5",
    img: "/assets/iphone.png",
  },
];
