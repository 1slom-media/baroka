import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { getStatusText } from "utils/helpers";
import { orderStatuses } from "utils/helpers";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function OrderTabs() {
  const router = useRouter();
  const ordersLimit = useSelector((state) => state.userStats.ordersLimit);
  const handleChange = (event, newValue) => {
    router.push(
      `/profile/statistics/orders?status=${newValue}&page=1&limit=${ordersLimit}`
    );
  };

  return (
    <Tabs
      textColor="primary"
      value={router?.query?.status ? router?.query?.status : "new"}
      onChange={handleChange}
      aria-label="basic tabs example"
      scrollButtons
      variant="scrollable"
    >
      {orderStatuses?.map((status, indx) => (
        <Tab
          sx={{ color: "#fff" }}
          key={indx}
          label={getStatusText(status)}
          value={status}
        />
      ))}
    </Tabs>
  );
}
