import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import MobileSearchInput from "components/general/Inputs/MobileSearchBar";
import { Avatar, Divider, IconButton, Stack } from "@mui/material";
import GrapeArrowLeft from "components/icons/ArrowLeftGrape";
import { Search } from "@mui/icons-material";
import { searchProductAction } from "redux-store/products/search.slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

function SearchModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const dataList = useSelector((state) => state.searchProduct);
  const handleSearch = (e) => {
    setQuery(e.target.value);
    dispatch(searchProductAction(e.target.value));
  };
  const router = useRouter();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={handleClose}>
                <GrapeArrowLeft />
              </IconButton>
              <MobileSearchInput
                value={query}
                onChange={handleSearch}
                loading={dataList?.isLoading}
                placeholder="Mahsulot qidirish"
              />
            </Stack>

            <Stack mt={3}>
              <Typography variant="body2" color="#5F5F5F">
                Ommabop
              </Typography>
              <Stack mt={2} gap={2}>
                {commonSearches.map((item) => (
                  <Stack
                    onClick={() => {
                      setQuery(item.value);
                      dispatch(searchProductAction(item.value));
                    }}
                    key={item._id}
                    direction="row"
                    alignItems="flex-start"
                  >
                    <Search
                      sx={{
                        fontSize: 20,
                      }}
                      color="rgba(118,121,127,0.7)"
                    />
                    <Stack ml={2} width="100%">
                      <Typography mb={2} variant="string" color="#000000">
                        {item.value}
                      </Typography>
                      <Divider />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
              <Stack mt={2}>
                {dataList?.list?.products?.length ? (
                  dataList?.list?.products?.map((item) => (
                    <Stack
                      onClick={() => {
                        handleClose();
                        router.push(`/shop/${item?.uid}`);
                      }}
                      direction="row"
                      key={item?._id}
                      alignItems="center"
                      mt={0.5}
                      sx={{ p: 0.5, cursor: "pointer", background: "#fff" }}
                    >
                      <Avatar src={item?.image} />
                      <Stack ml={1}>
                        <Typography sx={{ color: "#000000", fontSize: "12px" }}>
                          {item?.title[router?.locale]}
                        </Typography>
                        <Typography
                          sx={{ mt: 0.5, color: "#000000", fontSize: "12px" }}
                        >
                          {item?.purchasePrice?.toLocaleString()} so&apos;m
                        </Typography>
                      </Stack>
                    </Stack>
                  ))
                ) : (
                  <Stack textAlign="center" color="error">
                    Bunday mahsulot topilmadi
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

export default SearchModal;

const commonSearches = [
  {
    _id: 1,
    value: "Vitek",
  },
  {
    _id: 2,
    value: "Telefonlar so'ngi",
  },
  {
    _id: 3,
    value: "Sochlar parvarishi",
  },
  {
    _id: 5,
    value: "Ozish",
  },
];
