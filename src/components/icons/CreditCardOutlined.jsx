import { SvgIcon } from "@mui/material";
import React from "react";

const CreditCardOutlined = (props) => {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_69_839)">
        <path
          d="M17.4997 3.33331H2.49967C1.5792 3.33331 0.833008 4.07951 0.833008 4.99998V15C0.833008 15.9205 1.5792 16.6666 2.49967 16.6666H17.4997C18.4202 16.6666 19.1663 15.9205 19.1663 15V4.99998C19.1663 4.07951 18.4202 3.33331 17.4997 3.33331Z"
          stroke="#566A7F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.833008 8.33331H19.1663"
          stroke="#566A7F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_69_839">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default CreditCardOutlined;
