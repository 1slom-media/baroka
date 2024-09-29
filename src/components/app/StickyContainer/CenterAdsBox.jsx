import { Button, Stack, styled, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledStack = styled(Stack)(({ theme }) => ({
  background: theme.palette.primary.main,
  border: `3px solid ${theme.palette.background.border2}`,
  height: "400px",
  width: "100%",
  borderRadius: "30px",

  "& .text-sale": {
    background: theme.palette.text.main,
    padding: "5px 10px",
    borderRadius: "20px",
  },
  "& .right-side": {
    backgroundImage: "url('/assets/iphone2.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
  },
  "& button": {
    maxWidth: "170px",
    border: `2px solid ${theme.palette.background.paper}`,
    background: theme.palette.black.dark,
    borderRadius: "25px",
    "&:hover": {
      background: theme.palette.black.dark,
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .text-date": {
      fontSize: "12px",
    },
    "& .text-sale": {
      background: theme.palette.text.main,
      padding: "3px 6px",
      borderRadius: "15px",
      fontSize: "12px",
    },
    "& .right-side": {
      height: "400px !important",
      backgroundSize: "100% 80%",
    },
  },
}));

// const StyledStackForText = styled

const CenterAdsBox = () => {
  return (
    <StyledStack
      mt={2}
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-evenly"
      p={{ xs: 2, md: 0 }}
    >
      <Stack
        width={{ md: "40%", xs: "100%" }}
        height={{ xs: "200px", md: "100%" }}
        className="right-side"
        order={{ xs: 2, md: 1 }}
      >
        <Typography variant="h4" mt={2} color="text.200" textAlign="center">
          iPhone 14 Pro
        </Typography>
      </Stack>
      <Stack
        width={{ md: "40%", xs: "100%" }}
        height="100%"
        direction="column"
        justifyContent="center"
        gap="15px"
        order={{ xs: 1, md: 2 }}
      >
        <Typography variant="h4" color="text.mixedBlack">
          Chegirma
        </Typography>
        <Typography variant="h3" color="text.200">
          With 10% discount + free charger
        </Typography>
        <Stack
          direction="row"
          p="4px"
          bgcolor="#fff"
          maxWidth="350px"
          justifyContent="space-between"
          borderRadius="20px"
          alignItems="center"
        >
          <Typography variant="body2" color="text.200" className="text-sale">
            Chegirma muddati
          </Typography>
          <Typography variant="body2" color="text.main" className="text-date">
            14-Dekabrgacha
          </Typography>
          <ArrowForwardIcon />
        </Stack>
        <Button color="primary" variant="contained">
          Buyurtma berish
        </Button>
      </Stack>
    </StyledStack>
  );
};

export default CenterAdsBox;
