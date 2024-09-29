import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  styled,
  Typography,
  Badge,
  Divider,
} from "@mui/material";

import CartOutlined from "components/icons/CartOutlined";
import { useRouter } from "next/router";
import React from "react";
import CartCard from "../ProductCards/CartCard";
import { useSelector } from "react-redux";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";

const StyledCartButton = styled(IconButton)(({ theme }) => ({
  padding: "8px",
  borderRadius: "50%",
  [theme.breakpoints.down("sm")]: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
}));

const StyledCancelIcon = styled(IconButton)(({ theme }) => ({
  padding: "5px",
  borderRadius: "50%",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledBoxCards = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  position: "absolute",
  top: "66px",
  left: "0",
  right: "0",
  marginInline: "auto",
  height: "calc(100vh - 154px)",
  [theme.breakpoints.down("sm")]: {
    top: "50px",
    height: "calc(100vh - 106px)",
  },
}));

const CartDrawer = () => {
  const qty = useSelector((state) => state.cart.quantity);
  const cartItems = useSelector((state) => state.cart.data);
  const [state, setState] = React.useState({
    right: false,
  });
  const router = useRouter();

  const toggleDrawer =
    (anchor = "right", open) =>
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleRoute = () => {
    toggleDrawer("right", false)("");

    router.push("/profile/cart");
  };

  const list = () => (
    <Box
      sx={{ width: { xs: 300, sm: 400 }, overflowY: "auto" }}
      p={{ xs: 1, md: 3 }}
      role="presentation"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        top={1}
        left="0"
        width="100%"
        p={{ xs: 1, md: 2 }}
        mx="auto"
        bgcolor="warning.contrastText"
      >
        <Typography variant="h6" color="text.secondary">
          Savat
        </Typography>
        <StyledCancelIcon onClick={toggleDrawer("right", false)}>
          <CloseIcon />
        </StyledCancelIcon>
      </Stack>
      <Divider />
      <StyledBoxCards p={{ xs: 1, md: 2 }}>
        {cartItems.length == 0 || !cartItems.length ? (
          <EmptyCard img="/assets/media/cart.png" />
        ) : (
          cartItems.map((item) => <CartCard key={item._id} {...item} />)
        )}
      </StyledBoxCards>
      <Stack
        position="absolute"
        bottom={1}
        left="0"
        width="100%"
        p={{ xs: 1, md: 2 }}
        mx="auto"
        bgcolor="warning.contrastText"
      >
        <Button
          onClick={handleRoute}
          variant="contained"
          color="secondary"
          disabled={!cartItems.length}
          fullWidth
        >
          Buyurtma berish
        </Button>
      </Stack>
    </Box>
  );

  return (
    <React.Fragment>
      <Badge badgeContent={qty} color="error">
        <StyledCartButton onClick={toggleDrawer("right", true)}>
          <CartOutlined />
        </StyledCartButton>
      </Badge>
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
};

export default CartDrawer;
