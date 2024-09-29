import { Box, styled, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
}));

const StyledImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "contain",
}));

const OverLay = styled(Box)(() => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: "12px",
  display: "flex",
  justifyContent: "flex-end",
}));

const StyledInput = styled("input")(() => ({
  display: "none",
}));

const StyledIconButton = styled(IconButton)((theme) => ({
  background: "#1b2530e0",
  boxShadow: "0px 8px 20px rgba(11, 16, 121, 0.15)",
  width: 40,
  height: 40,
  marginTop: "-10px",
  marginRight: "-10px",
  borderRadius: "50%",
  "&:hover": {
    background: "#1b2530e0",
  },
}));

const ImagePicker = ({ src, setImage, disabled, setImg }) => {
  const ref = useRef();

  const getImage = () => {
    ref.current.click();
  };

  const handleImage = (e) => {
    let img = e.target.files[0];
    let imgUrl = URL.createObjectURL(img);
    setImage(imgUrl);
    setImg(img);
  };

  return (
    <Container>
      <StyledImage component="img" src={src} alt="Profile image" />
      <OverLay>
        <StyledIconButton disabled={disabled} onClick={getImage}>
          <CameraAltOutlinedIcon fontSize="small" color="primary" />
        </StyledIconButton>
        <StyledInput ref={ref} type="file" onChange={handleImage} />
        <StyledInput />
      </OverLay>
    </Container>
  );
};

ImagePicker.propTypes = {
  src: PropTypes.string,
  setImage: PropTypes.func,
  disabled: PropTypes.bool,
};

ImagePicker.defaultProps = {
  src: "",
  setImage: () => {},
  disabled: false,
};

export default ImagePicker;
