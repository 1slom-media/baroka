import { Box, Checkbox, Stack, Typography, styled } from "@mui/material";
import * as React from "react";
import MoreIcon from "components/icons/MoreIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StreamDeleteModal from "../Modals/StreamDeleteModal";

const StyledMoreBox = styled(Box)(({ theme }) => ({
  display: "inline-block",
  padding: "8px 10px 2px 10px",
  background: theme.palette.text.whiteOff,
  borderRadius: "50%",
  cursor: "pointer",
  ".StyledMoreBox": {
    padding: "0px !important",
  },
}));

const MoreButton = ({ _id, uid, number, handleDeleteStream, state, onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <StyledMoreBox
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreIcon />
      </StyledMoreBox>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          top: "43px",
          ".MuiMenu-list": {
            padding: "0px !important",
          },
        }}
      >
        <StreamDeleteModal
          handleDelete={handleDeleteStream}
          error="Ushbu oqim o'chirilmoqda. Tasdiqlaysizmi?"
          title="Oqim o`chirish"
        />

        <MenuItem>
          <Box
            component="label"
            htmlFor={`check${_id}`}
            sx={{ userSelect: "none", cursor: "pointer" }}
          >
            <Typography variant="body1">Viloyatni o&apos;chirish</Typography>
          </Box>
          <Checkbox defaultChecked color="black" id={`check${_id}`} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MoreButton;

{
  /* <StyledMoreBox onClick={onClick}>
        
      </StyledMoreBox>
      <ModalBox display={state ? "flex" : "none"} id={_id} >
        
        <Stack
          direction="row"
          justifyContent="space-between"
          px={1}
          borderRadius="4px"
          color="#566A7F"
          alignItems="center"
        >
         
        </Stack>
      </ModalBox> */
}
