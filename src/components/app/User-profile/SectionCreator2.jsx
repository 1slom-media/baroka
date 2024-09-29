import { Stack, Typography } from "@mui/material";
import React from "react";

const SectionCreator2 = ({ name, children }) => {
  return (
    <Stack my={2}>
      <Stack justifyContent="flex-start">
        <Typography variant="body2" color="text.main">
          {name}
        </Typography>
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};

export default SectionCreator2;
