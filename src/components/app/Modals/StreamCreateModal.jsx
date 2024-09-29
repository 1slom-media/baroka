import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import TextField from "components/general/Inputs/TextField";
import { LoadingButton } from "@mui/lab";
import StreamCopyModal from "./StreamCopyModal";
import { useDispatch, useSelector } from "react-redux";
import { createUserStreams, setClose } from "redux-store/stream/create.slice";
import { Field, reduxForm } from "redux-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "#1d252f",
  p: 2,
  borderRadius: "5px",
};

function StreamCreateModal({ handleSubmit, product }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isStreamLoading = useSelector((state) => state.createdStream.isLoading);

  const [open, setOpen] = React.useState(false);
  const [sideModal, setSideModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callback = () => {
    setSideModal(true);
    setOpen(false);
  };

  const handleCreateStream = (values) => {
    dispatch(
      createUserStreams({
        token: token,
        data: { ...values, product },
        callback: callback,
      })
    );
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="text"
        color="primary"
        size="small"
        startIcon={<AddIcon color="inherit" />}
      >
        Yaratish
      </Button>
      <StreamCopyModal isOpen={sideModal} setOpen={setSideModal} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign="center">
          <Typography
            mb={2}
            variant="body2"
            component="h2"
            color="text.whiteOff"
          >
            Oqim yaratish
          </Typography>
          <Stack>
            <Field
              component={TextField}
              name="name"
              placeholder="Oqim nomini kiriting"
              inputProps={{
                sx: {
                  color: "white",
                },
              }}
            />
          </Stack>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button onClick={handleClose} variant="contained" color="error">
              BEKOR QILISH
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleCreateStream)}
              loading={isStreamLoading}
            >
              YARATISH
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

const validate = (values) => {
  let errors = {};
  const requiredFields = ["name"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  return errors;
};

export default reduxForm({
  form: "stream_form",
  validate,
})(StreamCreateModal);
