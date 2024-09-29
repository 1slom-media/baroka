import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CellTowerIcon from "@mui/icons-material/CellTower";
import LogoutIcon from "@mui/icons-material/Logout";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import useWindowSize from "hooks/useWindowSize";
import MenuDropdownProfile from "../User-profile/MenuDropdown";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { useSelector } from "react-redux";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getSiteSettings } from "redux-store/settings/site.settings.slice";
import MarketingMobileDrawer from "./MarketingMobileDrawer";
import DrawerListItem from "./DrawerItem";
import Head from "next/head";
import { setUserData } from "redux-store/user/user.slice";
import { exitUser } from "redux-store/user/auth.slice";

const routes = [
  {
    id: "dashboard",
    name: "Dashboard",
    route: "/profile/dashboard",
    icon: (rt, cd) => (
      <SpeedOutlinedIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
  },
  {
    id: "market",
    name: "Offer market",
    route: "/profile/market",
    icon: (rt, cd) => (
      <StorefrontOutlinedIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
  },
  {
    id: "stream",
    name: "Oqimlar",
    route: "/profile/streams",
    icon: (rt, cd) => (
      <OpenInNewOutlinedIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
  },
  {
    id: "statistics",
    name: "Statistika",
    route: "/profile/statistics",
    icon: (rt, cd) => (
      <BarChartOutlinedIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
    children: [
      {
        title: "Barcha buyurtmalar",
        path: "/profile/statistics/orders",
      },
      {
        title: "Oqimlar buyicha",
        path: "/profile/statistics",
      },
      {
        title: "So'rovlar tarixi",
        path: "/profile/statistics/requests",
      },
    ],
  },
  {
    id: "payment",
    name: "To'lovlar",
    route: "/profile/payments",
    icon: (rt, cd) => (
      <AccountBalanceOutlinedIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
  },
  {
    id: "game",
    name: "Konkurslar",
    route: "/profile/game",
    icon: (rt, cd) => (
      <CardGiftcardIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
  },
  {
    id: "api",
    name: "API",
    route: "/profile/api",
    icon: (rt, cd) => (
      <CellTowerIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
  },
];

const userRoutes = [
  {
    id: "profile",
    name: "Profil tahriri",
    route: "/profile/edit",
    icon: (rt, cd) => (
      <AccountCircleIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
  },
  {
    id: "bot",
    name: "Bot sozlamalari",
    route: "/profile/settings",
    icon: (rt, cd) => (
      <SmartToyIcon
        sx={{ color: cd?.includes(rt) ? "primary.main" : "text.gray" }}
      />
    ),
  },
];

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1, 3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "start",
}));

export default function LayoutDrawer({ children }) {
  const router = useRouter();
  const screenWidth = useWindowSize();
  const [open, setOpen] = React.useState(true);
  const user = useSelector((state) => state.user);
  const settings = useSelector((state) => state.settings.site);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getSiteSettings());
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function exitProfile() {
    dispatch(setUserData());
    dispatch(exitUser());
    router.push("/");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Head>
        <meta name="theme-color" content="#1b2530e0" />
      </Head>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "#1b2530e0",
          padding: 0,
          width: "100%",
        }}
        open={open}
      >
        <Toolbar>
          <MarketingMobileDrawer />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
              display: { xs: "none", lg: "block" },
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, ...(open && { color: "transparent" }) }}
            component="div"
          >
            DOZEN
          </Typography>

          <Stack alignItems="center" pr={3} direction="row">
            <MenuDropdownProfile dashboard user={user} />
          </Stack>
        </Toolbar>
      </AppBar>
      {screenWidth > 1300 ? (
        <Main open={open}>{children}</Main>
      ) : (
        <div>{children}</div>
      )}
      <Drawer
        sx={{
          flexShrink: 0,
          backgroundColor: "transparent",
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: screenWidth > 1200 ? "transparent" : "#1b2530",
            border: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Stack alignItems="space-between">
          <DrawerHeader sx={{ background: "#1b2530e0" }}>
            <Stack direction="row" alignItems="center" gap="10px">
              <IconButton onClick={handleDrawerClose}>
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
                color="text.whiteOff"
                component="div"
              >
                DOZEN
              </Typography>
            </Stack>
          </DrawerHeader>
          <Stack py={2} px={1}>
            <Typography pl={1} variant="string" color="text.whiteOff">
              Menyular
            </Typography>
            <List>
              {routes?.map((route) => {
                return <DrawerListItem key={route.id} {...route} />;
              })}
            </List>
          </Stack>

          <Stack pb={2} px={1}>
            <Typography pl={1} variant="string" color="text.whiteOff">
              Foydalanuvchi
            </Typography>
            <List>
              {userRoutes.map((route, index) => (
                <ListItem active key={route.id} disablePadding>
                  <ListItemButton
                    onClick={() => router.push(route.route)}
                    active
                  >
                    <ListItemIcon sx={{ color: "text.gray" }}>
                      {route?.icon(route.route, router?.pathname)}
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      sx={{
                        color: router?.pathname?.includes(route.route)
                          ? "primary.main"
                          : "text.gray",
                        fontSize: "13px",
                      }}
                      primary={route?.name}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton onClick={exitProfile}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "text.gray" }} />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    sx={{ color: "text.gray", fontSize: "13px" }}
                    primary="Chiqish"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
          <Stack px={2} mt={15} mb={3}>
            <Link
              href={settings?.marketingGroup ? settings?.marketingGroup : "#"}
            >
              <Button startIcon={<GroupsIcon />} variant="outlined">
                <Typography variant="caption">Adminlar uchun guruh</Typography>
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Drawer>
    </Box>
  );
}
