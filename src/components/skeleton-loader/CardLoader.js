import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { Card } from "@mui/material";
const StyledCardWrapper = styled(Card)(({ theme }) => ({
  background: theme.palette.background.dark,
  padding: "15px",
  borderRadius: "10px",
  width: "100%",
}));

export default function SkeletonCardLoader() {
  return (
    <StyledCardWrapper>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={140} />
      </Stack>
    </StyledCardWrapper>
  );
}
