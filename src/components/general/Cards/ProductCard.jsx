import {
  Box,
  Button,
  Card,
  IconButton,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import CartOutlined from "components/icons/CartOutlined";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { addTobasket } from "redux-store/cart/cart.slice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { ArrowForward, RemoveRedEye, Star } from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "13px",
  borderRadius: 0,
  margin: 0,
  border: `0.836328px solid ${theme.palette.background.border}`,
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0px 5px 26px rgba(0, 0, 0, 0.14)",
  },
  "& p": {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
  },
  "& img": {
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  width: "30px",
  height: "30px",
  borderRadius: "4px",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProductCard = ({
  image,
  title,
  purchasePrice,
  uid,
  fullPrice,
  rating,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const name = title[router?.locale];
  const handleBasket = () => {
    dispatch(addTobasket({ uid, name, price: purchasePrice, image }));
  };
  return (
    <Stack
      sx={{ cursor: "pointer" }}
      onClick={() => router.push(`/shop/${uid}`)}
    >
      <Stack position="relative" width="100%">
        <Box
          component="img"
          alt={name}
          src={image}
          width="100%"
          height={{ xs: "220px", md: "300px" }}
          onClick={() => router.push(`/shop/${uid}`)}
        />
      </Stack>
      <Typography
        my={1}
        variant="body1"
        color="text.main"
        onClick={() => router.push(`/shop/${uid}`)}
      >
        {name}
      </Typography>
      {fullPrice > purchasePrice ? (
        <Typography
          variant="caption"
          color="error.main"
          component={"del"}
          onClick={() => router.push(`/shop/${uid}`)}
        >
          {fullPrice?.toLocaleString()} so&apos;m
        </Typography>
      ) : null}
      <Typography
        variant="body1"
        color="text.main"
        onClick={() => router.push(`/shop/${uid}`)}
        mb={1}
      >
        {purchasePrice?.toLocaleString()} so&apos;m
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="5px">
          <Star sx={{ color: "orange" }} fontSize="small" />
          <Typography variant="string" mt={0.2}>
            {rating}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap="5px">
          <IconButton>
            <ArrowForward fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
