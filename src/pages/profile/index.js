import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import {
  StyledBorderBox,
  StyledIconBtnEdit,
} from "components/app/User-profile/StyledComponents";
import UserLayout from "components/app/User-profile/UserLayout";
import EditIcon from "components/icons/EditIcon";
import PhoneOutline from "components/icons/PhoneOutline";
import TelegramOutlined from "components/icons/TelegramOutlined";
import UserProfile from "components/icons/UserProfile";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux-store/user/user.slice";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.user);

  React.useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    } else {
      router.push("/auth");
    }
  }, [token]);

  return (
    <AdminLayout>
               
    </AdminLayout>
  );
};

export default Page;
