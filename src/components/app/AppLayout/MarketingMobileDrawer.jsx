import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CellTowerIcon from "@mui/icons-material/CellTower";
import LogoutIcon from "@mui/icons-material/Logout";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import DrawerListItem from "./DrawerItem";
import { useDispatch } from "react-redux";
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "start",
}));

export default function MarketingMobileDrawer() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const settings = useSelector((state) => state.settings.site);
  function exitProfile() {
    dispatch(setUserData());
    dispatch(exitUser());
    router.push("/");
  }
  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "block", lg: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          flexShrink: 0,
          backgroundColor: "transparent",
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#1b2530",
            border: "none",
          },
        }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Stack alignItems="space-between">
          <DrawerHeader sx={{ background: "#1b2530e0" }}>
            <Stack
              direction="row"
              alignItems="center"
              gap="10px"
              justifyContent="space-between"
              width="100%"
            >
              <Typography
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
                color="text.whiteOff"
                component="div"
              >
                Chegirma
              </Typography>
              <IconButton
                sx={{ marginRight: "15px" }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
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
    </div>
  );
}
