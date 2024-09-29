import { styled, Box, Button } from "@mui/material";

export const StyledBorderBox = styled(Box)(({ theme }) => ({
  width: "100%",
}));

export const StyledInfoChild = styled(Box)(({ theme, shadow }) => ({
  background: theme.palette.background.dark,
  borderRadius: "10px",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "5px",
  "& .MuiSvgIcon-root": {
    fill: "none",
  },
  ...(shadow && {
    boxShadow: shadow,
  }),
}));

export const StyledIconBtnEdit = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  minHeight: "40px",
  maxWidth: "40px",
  maxHeight: "40px",
  borderRadius: "50%",
  [theme.breakpoints.down("sm")]: {},
}));
