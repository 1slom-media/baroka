import { Box, styled } from "@mui/material";
import React from "react";

const StyledOrderCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary[300],
  border: `0.5px solid ${theme.palette.primary.border}`,
}));

const OrderLeftCard = ({ children }) => {
  return <StyledOrderCard p={2}>{children}</StyledOrderCard>;
};

export default OrderLeftCard;
