import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  return (
    <BottomNavigation
      sx={{ position: "relative", background: "#1b2530" }}
      onChange={(event, newValue) => {
        if (newValue === "*") return;
        if (token) {
          router.push(newValue);
        } else {
          router.push("/auth");
        }
      }}
      value={router?.pathname}
      showLabels
    >
      <BottomNavigationAction
        sx={{ color: "white" }}
        value="/profile"
        label={
          <Typography sx={{ fontSize: "11px" }} variant="string">
            Dashboard
          </Typography>
        }
        icon={<SpeedOutlinedIcon />}
      />
      <BottomNavigationAction
        value="/profile/market"
        sx={{ color: "white" }}
        label={
          <Typography sx={{ fontSize: "11px" }} variant="string">
            Market
          </Typography>
        }
        icon={<StorefrontOutlinedIcon />}
      />

      <BottomNavigationAction
        value="/profile/streams"
        sx={{ color: "white" }}
        label={
          <Typography sx={{ fontSize: "11px" }} variant="string">
            Oqim
          </Typography>
        }
        icon={<OpenInNewOutlinedIcon />}
      />
      <BottomNavigationAction
        value="/profile/statistics"
        sx={{ color: "white" }}
        label={
          <Typography sx={{ fontSize: "11px" }} variant="string">
            Statistika
          </Typography>
        }
        icon={<BarChartOutlinedIcon />}
      />
      <BottomNavigationAction
        value="/profile/payments"
        sx={{ color: "white" }}
        label={
          <Typography sx={{ fontSize: "11px" }} variant="string">
            To&apos;lovlar
          </Typography>
        }
        icon={<AccountBalanceOutlinedIcon />}
      />
    </BottomNavigation>
  );
}
