import { Card, styled } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const StyledCardWrapper = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const EmptyPageWrapper = ({ children }) => {
  return (
    <Stack
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <StyledCardWrapper sx={{ p: { xs: 2, md: 3 }, mt: 8 }}>
        {children}
      </StyledCardWrapper>
    </Stack>
  );
};

export default EmptyPageWrapper;
