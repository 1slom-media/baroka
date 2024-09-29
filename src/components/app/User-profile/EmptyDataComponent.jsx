import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./empty3.json";
import { Stack, Typography } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";

const EmptyDataComponent = ({ text }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const screenWidth = useWindowSize();

  return (
    <Stack alignItems="center" py={2}>
      <Lottie
        options={defaultOptions}
        height={400}
        width={screenWidth < 600 ? "100%" : 400}
      />
      <Typography color="text.white" variant="string">
        {text}
      </Typography>
    </Stack>
  );
};

export default EmptyDataComponent;
