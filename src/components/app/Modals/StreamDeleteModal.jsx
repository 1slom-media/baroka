import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, MenuItem, Stack, styled } from "@mui/material";
import DeleteOutlined from "components/icons/DeleteOutlined";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";

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

export const StyledIconBtnDelete = styled(Button)(({ theme }) => ({
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export default function ConfirmDeleteModal({ error, handleDelete, loading }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isLoading = useSelector((state) => state.deleteStream.isLoading);
  
  return (
    <>
      <MenuItem onClick={handleOpen} justifyContent="space-between">
        <Typography variant="subtitle1" color="text.main" mr="30px" py={1}>
          Oqimni o`chirish
        </Typography>
        <DeleteOutlined />
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            bgcolor="rgba(255, 51, 51, 0.15)"
            px={2}
            py={3}
            borderRadius="20px"
          >
            <Stack alignItems="center">
              <Typography variant="body2" color="text.main" mb={1}>
                Oqim o&apos;chirish
              </Typography>
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
              <Button
                onClick={handleClose}
                variant="contained"
                color="disabled"
              >
                BEKOR QILISH
              </Button>
              <LoadingButton
                onClick={() => handleDelete(handleClose, isLoading)}
                variant="contained"
                color="error"
                loading={isLoading}
              >
                TASDIQLASH
              </LoadingButton>
            </Stack>
          </Box>
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
