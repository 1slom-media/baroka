import { Container, Stack } from "@mui/material";
import Appheader from "./Appheader";
import AppFooter from "./AppFooter";
import MobileHeader from "./MobileHeader";

const AppLayout = ({ children, isDifferentSearch }) => {
  return (
    <Stack minHeight="100vh" justifyContent="space-between">
      <Stack>
        <Stack display={{ xs: "none", sm: "flex" }}>
          <Appheader />
        </Stack>
        <Stack display={{ xs: "flex", sm: "none" }}>
          <MobileHeader isDifferentSearch={isDifferentSearch} />
        </Stack>
        <Stack>
          <Container>{children}</Container>
        </Stack>
      </Stack>
      <AppFooter />
    </Stack>
  );
};

export default AppLayout;
