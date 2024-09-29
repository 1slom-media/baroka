import { Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import LayoutDrawer from "./LayoutDrawer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "redux-store/user/user.slice";
import { getSiteSettings } from "redux-store/settings/site.settings.slice";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getSiteSettings())
    if (token) {
      dispatch(getUser(token));
    } else {
      router.push("/");
    }
  }, [token]);
  return (
    <Stack
      justifyContent="space-between"
      minHeight="100vh"
      sx={{
        height: "100vh",
        backgroundImage: "url(/assets/2.jpg)",
        backgroundColor: "#1b253096",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflowY: "auto",
      }}
    >
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "#1b2530e0",
          overflowY: "auto",
        }}
      >
        <LayoutDrawer>
          <Stack mt={11} pb={8}>
            <Container maxWidth="xl">{children}</Container>
          </Stack>
        </LayoutDrawer>
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
