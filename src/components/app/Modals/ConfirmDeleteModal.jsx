import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Stack, styled } from "@mui/material";
import DeleteOutlined from "components/icons/DeleteOutlined";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

export const StyledIconBtnDelete = styled(IconButton)(({ theme }) => ({
  padding: "8px",
  borderRadius: "50%",
  background: theme.palette.error.light,
  position: "absolute",
  right: "-10px",
  top: "1px",
  zIndex: 4,
}));

export default function ConfirmDeleteModal({
  error,
  handleDelete,
  loading,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledIconBtnDelete onClick={handleOpen}>
        <DeleteOutlined />
      </StyledIconBtnDelete>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack alignItems="center">
            <Box
              width={60}
              height={60}
              component="img"
              src="/assets/media/delete.png"
              alt="delete display image"
            />
          </Stack>
          <Box width="80%" margin="auto">
            <Typography
              my={2}
              variant="body1"
              component="h2"
              color="text.secondary"
              align="center"
            >
              {error}
            </Typography>
          </Box>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button onClick={handleClose} variant="contained" color="disabled">
              BEKOR QILISH
            </Button>
            <LoadingButton
              onClick={handleDelete}
              variant="contained"
              color="error"
            >
              TASDIQLASH
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

ConfirmDeleteModal.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};

ConfirmDeleteModal.defaultProps = {
  error: "",
  handleDelete: () => {},
};
