import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  StyledCopyButton,
  StyledInput,
} from "components/general/Inputs/StyledInputBase";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyOutlined from "components/icons/CopyOutlined";
import { toast } from "react-toastify";

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

export default function StreamCopyModal({ isOpen, setOpen }) {
  const data = useSelector((state) => state.createdStream.data.data);
  const [copy, setCopy] = React.useState({
    value: `https://dozen.uz/oqim/${data?.number}`,
    copied: false,
  });

  const handleCopy = () => {
    setCopy({ ...copy, copied: true });
    toast.success("Nusxa olindi!");
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setCopy({
      ...copy,
      value: `https://dozen.uz/oqim/${data?.number}`,
    });
  }, [data?.number]);
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography mb={2} variant="body2" component="h2" color="text.whiteOff">
          {data?.name}
        </Typography>
        <Stack>
          <StyledInput
            id="outlined-basic"
            variant="outlined"
            size="medium"
            fullWidth
            value={`https://dozen.uz/oqim/${data?.number}`}
            disabled
            sx={{ height: 44, background: "#eee" }}
            endAdornment={
              <CopyToClipboard text={copy.value} onCopy={handleCopy}>
                <StyledCopyButton>
                  <CopyOutlined sx={{ fill: "none !important" }} />
                </StyledCopyButton>
              </CopyToClipboard>
            }
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
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Saqlash
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
}
