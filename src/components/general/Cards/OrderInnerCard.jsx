import { Box, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const StyledBoxWrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.background.border}`,
}));

const OrderCard = ({ productId, quantity, price, _id }) => {
  return (
    <StyledBoxWrapper>
      <Box
        width="100%"
        height="250px"
        borderRadius="10px"
        overflow="hidden"
        p={2}
      >
        <Box
          component="img"
          src={productId?.image[0]}
          alt={productId?.name}
          width="100%"
          height="100%"
          borderRadius="10px"
        />
      </Box>
      <Box px={2}>
        <Typography my={1} variant="body2" color="text.main">
          {productId?.name}
        </Typography>
        <Typography my={1} variant="body1" color="text.main">
          {price ? price.toLocaleString() : productId?.price.toLocaleString()}
          so&apos;m
        </Typography>
      </Box>
      <Box px={2} mb={1}>
        <Typography variant="body1" color="primary">
          {quantity} dona
        </Typography>
      </Box>
    </StyledBoxWrapper>
  );
};

export default OrderCard;
