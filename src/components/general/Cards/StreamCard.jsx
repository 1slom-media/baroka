import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStreams } from "redux-store/stream/delete.slice";
import { getUserStreams } from "redux-store/stream/get.slice";
import TextInput from "../Inputs/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import CopyOutlined from "components/icons/CopyOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import Checkbox from "@mui/material/Checkbox";
import { updateStreamRegion } from "redux-store/stream/region.slice";

const StreamCard = ({
  name,
  number,
  product,
  query,
  _id,
  page,
  isRegionOn,
}) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleDeleteStream = (callback, isLoading) => {
    dispatch(deleteUserStreams({ token, _id, callback }));
    if (!isLoading) {
      dispatch(getUserStreams({ token, page }));
    }
  };

  const handleCopyStream = () => {
    toast.success("Nusxa olindi!");
  };

  const callBack = () => {
    dispatch(
      getUserStreams({ token, params: { page, filter: query, limit: 9 } })
    );
  };

  const router = useRouter();

  const handleRegionUpdate = () => {
    dispatch(
      updateStreamRegion({
        token,
        id: number,
        callBack,
        isRegionOn: !isRegionOn,
      })
    );
  };

  return (
    <Stack
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.3)",
        p: 1,
        borderRadius: "2px",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "40px",
            background: "#08cf65",
            textAlign: "center",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {number}
        </Box>
      </Box>
      <Stack direction="row" gap="10px">
        <Box
          sx={{ width: "80px", height: "80px" }}
          component="img"
          src={product?.images[0]["image"][540]["high"]}
        />
        <Stack>
          <Typography variant="string" color="text.white">
            {name}
          </Typography>
          <Box my={1} mt={3}>
            <TextInput
              value={`https://dozen.uz/oqim/${number}`}
              inputProps={{
                sx: {
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  minWidth: "200px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "2px",
                },
              }}
              size="small"
              fullWidth
            />
          </Box>
        </Stack>
      </Stack>
      <Stack mt={1} alignItems="end" width="100%">
        <ButtonGroup
          variant="text"
          aria-label="outlined primary button group"
          sx={{ width: "100%" }}
        >
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteStream}
          >
            O&apos;chir
          </Button>
          <Button
            onClick={() => router.push(`/profile/statistics/${number}`)}
            color="warning"
            startIcon={<DonutSmallIcon />}
          >
            Statistika
          </Button>
          <CopyToClipboard text={`https://dozen.uz/oqim/${number}`}>
            <Button
              color="primary"
              startIcon={<CopyOutlined />}
              onClick={handleCopyStream}
            >
              Nusxalash
            </Button>
          </CopyToClipboard>
        </ButtonGroup>
      </Stack>
      <Stack sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.3)" }}>
        <Stack direction="row" alignItems="center">
          <Checkbox
            color="secondary"
            inputProps={{
              sx: { border: "1px solid rgba(255, 255, 255, 0.3)" },
            }}
            onClick={handleRegionUpdate}
            checked={isRegionOn}
          />
          <Typography color="text.whiteOff" variant="string">
            Viloyat tanlashni sozlash
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StreamCard;
