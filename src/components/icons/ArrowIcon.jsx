import React from "react";
import { SvgIcon } from "@mui/material";
const ArrowIcon = (props) => {
  return (
    <SvgIcon
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="40" fill="#FFBA33" fillOpacity="0.14" />
      <path
        d="M28.5303 20.5303C28.8232 20.2374 28.8232 19.7626 28.5303 19.4697L23.7574 14.6967C23.4645 14.4038 22.9896 14.4038 22.6967 14.6967C22.4038 14.9896 22.4038 15.4645 22.6967 15.7574L26.9393 20L22.6967 24.2426C22.4038 24.5355 22.4038 25.0104 22.6967 25.3033C22.9896 25.5962 23.4645 25.5962 23.7574 25.3033L28.5303 20.5303ZM12 20.75L28 20.75L28 19.25L12 19.25L12 20.75Z"
        fill="#FFA800"
      />
    </SvgIcon>
  );
};

export default ArrowIcon;
