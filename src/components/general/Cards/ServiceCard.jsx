import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const ServiceCard = ({ name, image, desc }) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      height="100%"
      bgcolor="background.services"
      p={2}
      borderRadius="10px"
      gap="15px"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box component="img" src={image} alt={name} />
      </Box>
      <Typography variant="body2" color="info.800" textAlign="center">
        {name}
      </Typography>
      <Typography variant="body1" color="info.800" textAlign="center">
        {desc}
      </Typography>
    </Stack>
  );
};

export default ServiceCard;
