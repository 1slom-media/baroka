import { Stack, Box, Container, Badge } from "@mui/material";
import MobileDrawer from "../Drawers/MobileDrawer";
import IconButton from "@mui/material/IconButton";
import GrapeCart from "components/icons/GrapeCart";
import MobileSearchInput from "components/general/Inputs/MobileSearchBar";
import SearchModal from "../Modals/SearchModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuDropdownProfile from "../User-profile/MenuDropdown";

const MobileHeader = ({ isDifferentSearch }) => {
  const [open, setOpen] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);

  const router = useRouter();
  return (
    <Stack>
      <Stack
        p={1}
        mb={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: "fixed",
          width: "100%",
          zIndex: 10,
          background: "#fff",
          display: open ? "none" : "flex",
        }}
      >
        <Stack direction="row" alignItems="center">
          <MobileDrawer />
          <Box
            onClick={() => router.push("/")}
            width={50}
            height={40}
            src="/assets/logo.png"
            component="img"
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <MenuDropdownProfile user={user} />
        </Stack>
      </Stack>
      <Container sx={{ marginTop: "65px" }}>
        <MobileSearchInput
          onClick={() => setOpen(!open)}
          placeholder="Mahsulotlarni izlash"
          InputLabelProps={{
            sx: {
              color: "#fff",
            },
          }}
        />
        <SearchModal open={open} setOpen={setOpen} />
      </Container>
    </Stack>
  );
};

export default MobileHeader;
