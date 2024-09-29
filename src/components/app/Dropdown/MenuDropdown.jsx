import {
  Avatar,
  Fade,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: "5px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const StyledMenu = styled(Menu)(() => ({
  top: "10px",
  padding: "8px",
  "& .MuiList-root": {
    padding: "8px",
  },
}));

const MenuDropdown = ({ anchorEl, handleClose, open, data = [] }) => {
  const router = useRouter();
  return (
    <StyledMenu
      id="fade-menu"
      MenuListProps={{
        "aria-labelledby": "fade-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      {data?.map((item) => (
        <Link
          key={item._id}
          href={`/category/${item.uid}`}
          onClick={handleClose}
        >
          <StyledMenuItem>
            <Avatar sx={{ width: 35, height: 35 }} src={item.avatar} />
            <Typography variant="string">
              {item?.title[router?.locale]}
            </Typography>
          </StyledMenuItem>
        </Link>
      ))}
    </StyledMenu>
  );
};

export default MenuDropdown;
