import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Typography, styled } from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUserData } from "redux-store/user/user.slice";
import { useRouter } from "next/router";
import { exitUser } from "redux-store/user/auth.slice";
import GrapeUser from "components/icons/GrapeUser";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import useWindowSize from "hooks/useWindowSize";
import PaidIcon from "@mui/icons-material/Paid";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.light,
  "& svg": {
    marginRight: "10px",
  },
}));

const MenuDropdownProfile = ({ user, dashboard }) => {
  const screenWidth = useWindowSize();
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function exitProfile() {
    dispatch(setUserData());
    dispatch(exitUser());
    router.push("/");
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Profilga o'tish">
          <IconButton
            onClick={handleClick}
            color="inherit"
            aria-label="open drawer"
            edge="end"
            disableRipple
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={user?.token ? user?.data?.user?.avatar : ""}
            >
              {user?.data?.user && user?.data?.user?.name[0]
                ? user?.data?.user?.name[0]
                : ""}
            </Avatar>
            {screenWidth > 900 &&
            user?.data?.user &&
            router?.pathname?.includes("profile") ? (
              <Stack ml={2}>
                <Typography variant="string">
                  {user?.data?.user?.name}
                </Typography>
                <Stack gap="5px" mt={0.5} direction="row" alignItems="center">
                  <PaidIcon sx={{ fontSize: "16px", color: "orange" }} />
                  <Typography variant="caption" align="start">
                    {user?.data?.user?.balance?.toLocaleString()} so&apos;m
                  </Typography>
                </Stack>
              </Stack>
            ) : null}
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            background: dashboard ? "#1b2530e0" : "#fff",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "transparent",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        // http://t.me/barokaBot
      >
        {user?.token
          ? [
              <Link href="/profile/dashboard" key={294}>
                <StyledMenuItem sx={{ color: dashboard ? "white" : "inherit" }}>
                  <Avatar src={user?.data?.user?.avatar} />
                  Admin bo&apos;limi
                </StyledMenuItem>
              </Link>,
              <Link
                href={`http://t.me/barokaBot?start=${user?.data?.user?._id}`}
                key={295}
              >
                <StyledMenuItem sx={{ color: dashboard ? "white" : "inherit" }}>
                  <SettingsOutlinedIcon fontSize="70px" />
                  Botni ulash
                </StyledMenuItem>
              </Link>,
              <Divider key={299} />,
              <StyledMenuItem
                sx={{ color: dashboard ? "white" : "inherit" }}
                onClick={exitProfile}
                key={296}
              >
                <ListItemIcon>
                  <Logout
                    sx={{ color: dashboard ? "white" : "inherit" }}
                    fontSize="small"
                  />
                </ListItemIcon>
                Chiqish
              </StyledMenuItem>,
            ]
          : [
              <Link href="/auth" key={298}>
                <StyledMenuItem>
                  <GrapeUser /> Profilga kirish
                </StyledMenuItem>
              </Link>,
              <Link href="/auth" key={2928}>
                <StyledMenuItem>
                  <InfoOutlinedIcon /> Biz haqimizda
                </StyledMenuItem>
              </Link>,
            ]}
      </Menu>
    </React.Fragment>
  );
};

export default MenuDropdownProfile;
