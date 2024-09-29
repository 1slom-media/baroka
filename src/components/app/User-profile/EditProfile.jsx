import {
  Button,
  Stack,
  Box,
  Chip,
  Typography,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import ImagePicker from "components/app/User-profile/imagePicker";
import TextInput from "components/general/Inputs/TextField";
import PhoneOutline from "components/icons/PhoneOutline";
import TelegramOutlined from "components/icons/TelegramOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import UserProfile from "components/icons/UserProfile";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm, initialize } from "redux-form";
import { setToken } from "redux-store/user/auth.slice";
import { editUser } from "redux-store/user/user.slice";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import RegionSelect from "components/general/Inputs/RegionSelectInput";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import { LoadingButton } from "@mui/lab";

const EditProfile = ({ handleSubmit, initialValues }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.user?.data);
  const isEditLoading = useSelector((state) => state.user.isEditLoading);
  const tkn = useSelector((state) => state.user?.token);
  const [avatar, setAvatar] = React.useState("");
  const [img, setImg] = React.useState(null);

  const handleEditSubmit = (vs) => {
    var data = new FormData();
    if (img) {
      data.append("avatar", img);
    }
    data.append("telegramID", vs.telegramID);
    data.append("name", vs.name);
    data.append("region", vs.region);
    data.append("email", vs.email);
    data.append("surname", vs.surname);
    data.append("nickname", vs.nickname);
    dispatch(editUser({ data, token }));
    dispatch(setToken(tkn));
  };

  useEffect(() => {
    dispatch(initialize("user_profile_update", initialValues));
  }, [tkn]);

  return (
    <Box
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "3px",
        height: "100%",
        width: "100%",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "3px",
              height: "100%",
              width: "100%",
              p: 2,
            }}
          >
            <Stack direction="row" gap="20px">
              <Box
                width="115px"
                height="115px"
                borderRadius="50%"
                border="1px solid rgba(0 , 0 , 0 ,0.5)"
              >
                <ImagePicker
                  src={avatar || user?.avatar}
                  setImage={setAvatar}
                  setImg={setImg}
                />
              </Box>
              <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Typography variant="string" color="text.white">
                  {user?.name}
                </Typography>
                <Typography variant="string" color="text.white">
                  ID:{" "}
                  <Typography ml={1} component="span" color="primary">
                    @{user?.uid}
                  </Typography>
                </Typography>
                <Chip
                  label={user?.status ? "FAOL" : "BLOCK"}
                  size="small"
                  color={user?.status ? "primary" : "error"}
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextInput}
                  placeholder="Ism"
                  name="name"
                  fullWidth
                  size="small"
                  value={user?.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserProfile />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextInput}
                  placeholder="Familiya"
                  name="surname"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserProfile />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  placeholder="Telefon raqami"
                  value={user?.phone}
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutline sx={{ fill: "none !important" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  placeholder="Telegram"
                  name="telegramID"
                  type="number"
                  fullWidth
                  size="small"
                  value={user?.telegramID}
                  InputLabelProps={{ sx: { color: "#ffffff" } }}
                  InputProps={{
                    sx: { color: "#ffffff" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <TelegramOutlined sx={{ fill: "none !important" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    color: "#ffffff",
                    "& .MuiInputBase-root.MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={RegionSelect}
                  name="region"
                  type="text"
                  fullWidth
                  size="small"
                  value={user?.telegramID}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TelegramOutlined sx={{ fill: "none !important" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  placeholder="Faoliyat turi"
                  name="nickname"
                  type="text"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  placeholder="Elektron pochta manzili"
                  name="email"
                  type="text"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  my={2}
                  justifyContent="flex-start"
                  gap="20px"
                >
                  <LoadingButton
                    loading={isEditLoading}
                    color="primary"
                    onClick={handleSubmit(handleEditSubmit)}
                    variant="contained"
                    startIcon={<DownloadDoneIcon />}
                  >
                    Saqlash
                  </LoadingButton>
                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<TelegramIcon />}
                    target="_blank"
                    component="a"
                    href={`http://t.me/barokaBot?start=${user?._id}`}
                  >
                    Botni aktivlashtirish
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["name", "telegramID"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  return errors;
};

export default reduxForm({
  form: "user_profile_update",
  validate,
  enableReinitialize: true,
})(EditProfile);
