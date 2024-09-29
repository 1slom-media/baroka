import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { exitUser } from "redux-store/user/auth.slice";
import { setUserData } from "redux-store/user/user.slice";

export default function SessionModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const sessionExpireDate = useSelector(
    (state) => state.auth.sessionExpireDate
  );
  const handleSessionTimer = () => {
    if (sessionExpireDate) {
      setInterval(() => {
        const exp = new Date(sessionExpireDate);
        const today = new Date();
        if (exp?.getTime() < today?.getTime()) {
          handleOpen();
          dispatch(setUserData(null));
          dispatch(exitUser());
        }
      }, 5000);
    }
  };

  React.useEffect(handleSessionTimer, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: 400 },
    bgcolor: "#0f1218",
    border: 0,
    outline: "none",
    borderRadius: "5px",
    boxShadow: 5,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography color="#fff" variant="body1" component="h6">
          Sizning seans muddatingiz tugadi.
        </Typography>
        <Typography color="#ffffffbf" variant="string" mt={1} component="h6">
          Xavfsizlik yuzasidan ushbu qurilmadagi seans bekor qilindi. Davom
          ettirish uchun qayta login qiling.
        </Typography>
        <Stack mt={3}>
          <Button
            onClick={handleClose}
            component="a"
            href="/auth"
            variant="contained"
          >
            Profilga qayta kirish
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
