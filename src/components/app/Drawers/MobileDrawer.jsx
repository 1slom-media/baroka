import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
const StyledDrawerBox = styled(Box)(({ theme }) => ({
  transition: ".7s all ease-in-out",
  width: "300px",
  color: theme.palette.text.main,
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  overflow: "hidden",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  "&.active": {
    color: theme.palette.info[800],
    "&.active .MuiSvgIcon-root": {
      color: theme.palette.info[800],
    },
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  position: "relative",
  "&:before": {
    content: "url()",
    position: "absolute",
    bottom: 0,
    width: "80%",
    height: "1px",
    background: "#eaecf0",
    left: "20px",
  },
}));

const MobileDrawer = () => {
  const user = useSelector((state) => state.user);
  const [state, setState] = React.useState({
    left: false,
  });
  const router = useRouter();
  const pathname = router.pathname;
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <StyledDrawerBox
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <Box
        padding="20px 15px 0px 15px"
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box
          onClick={() => router.push("/")}
          width={100}
          height={70}
          src="/assets/logo.png"
          component="img"
        />
        <Box
          onClick={toggleDrawer("left", false)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
        >
          <CloseIcon />
        </Box>
      </Box>
      <List>
        <StyledLink href="/" className={pathname === "/" ? "active" : ""}>
          <StyledListItem disablePadding>
            <ListItemButton>
              <ListItemText
                sx={{ color: "text.300" }}
                primary={"Bosh sahifa"}
              />
            </ListItemButton>
          </StyledListItem>
        </StyledLink>
        <StyledLink
          href="/category"
          className={pathname === "/category" ? "active" : ""}
        >
          <StyledListItem disablePadding>
            <ListItemButton color="text.300">
              <ListItemText
                sx={{ color: "text.300" }}
                primary={"Kategoriyalar"}
              />
            </ListItemButton>
          </StyledListItem>
        </StyledLink>

        {user.data && user.token ? (
          ""
        ) : (
          <StyledLink
            href="/auth"
            className={pathname === "/auth" ? "active" : ""}
          >
            <StyledListItem disablePadding>
              <ListItemButton>
                <LoginIcon
                  sx={{ marginRight: "10px", color: "#667085 !important" }}
                />
                <ListItemText sx={{ color: "text.300" }} primary={"Krish"} />
              </ListItemButton>
            </StyledListItem>
          </StyledLink>
        )}
        {user.data && user.token ? (
          <>
            <StyledLink
              href="/profile/orders"
              className={pathname === "/profile/orders" ? "active" : ""}
            >
              <StyledListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    sx={{ color: "text.300" }}
                    primary={"Buyurtmalar"}
                  />
                </ListItemButton>
              </StyledListItem>
            </StyledLink>
          </>
        ) : (
          ""
        )}
      </List>
    </StyledDrawerBox>
  );
  return (
    <React.Fragment>
      <IconButton onClick={toggleDrawer("left", true)}>
        <MenuIcon color="primary" />
      </IconButton>

      <Drawer
        anchor="left"
        open={state["left"]}
        className="topDrawer"
        onClose={toggleDrawer("left", false)}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
};

export default MobileDrawer;
