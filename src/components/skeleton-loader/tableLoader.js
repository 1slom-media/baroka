import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styled from "@emotion/styled";
import { Card } from "@mui/material";

const StyledCardWrapper = styled(Card)(({ theme }) => ({
  background: theme.palette.background.dark,
  padding: "10px",
  borderRadius: "10px",
}));

export default function TableSkeletonLoader() {
  return (
    <StyledCardWrapper>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton />
      <Skeleton animation="wave" />
    </StyledCardWrapper>
  );
}
