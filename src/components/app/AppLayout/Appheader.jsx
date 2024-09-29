import {
  Stack,
  styled,
  Container,
  InputAdornment,
  Button,
  IconButton,
  Badge,
  Box,
  Collapse,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchInput from "components/general/Inputs/SearchInput";
import React from "react";
import MenuDropdown from "../Dropdown/MenuDropdown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getAllCategoryAction } from "redux-store/category/getAllCategory.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartOutlined from "components/icons/CartOutlined";
import MenuDropdownProfile from "components/app/User-profile/MenuDropdown";
import { useRouter } from "next/router";
import MobileDrawer from "../Drawers/MobileDrawer";
import { searchProductAction } from "redux-store/products/search.slice";

const StyledHeaderContainer = styled(Stack)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  padding: "10px 0",
  position: "sticky",
  top: 0,
  zIndex: 10,
  [theme.breakpoints.down("sm")]: {
    "& input": {
      paddingLeft: "10px",
    },
  },
}));

const StyledBtn = styled(Button)(({ theme }) => ({
  margin: "4px 4px 4px 10px",
  padding: "3px 10px",
  borderRadius: "15px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 10,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 5px",
    [theme.breakpoints.down("sm")]: {
      right: 6,
      top: 6,
    },
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StyledSearchbar = styled(Box)(({ theme, isShowDropdown }) => ({
  "&.searchBarWrapper": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "20px",
    flex: "1 1 auto",
    position: "relative",
    marginInline: "10%",
    [theme.breakpoints.down("sm")]: {
      marginInline: "0%",
      gap: "5px",
    },
    "& .filterBtn": {
      maxWidth: "48px",
      minWidth: "48px",
      minHeight: "48px",
      maxHeight: "48px",
      backgroundColor: "#ECF0F9",
      color: "#5048E5",
      padding: "0",
    },
    "& .styledCollapse": {
      padding: "10px",
      background: "#fff",
      borderRadius: "15px",
      width: "100%",
      boxShadow: "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      position: "relative",
      zIndex: 10,
      overflow: "hidden",
    },
    "& .styledStack": {
      display: isShowDropdown ? "block" : "none",
      position: "absolute",
      top: "15px",
      left: 0,
      right: 0,
      marginTop: "43px",
      height: "50vh",
      overflow: "auto",
    },
  },
}));

const StyledCartButton = styled(IconButton)(({ theme }) => ({
  padding: "8px",
  maxWidth: "40px",
  maxHeight: "40px",
  minHeight: "40px",
  minWidth: "40px",
  borderRadius: "50%",
  background: theme.palette.primary.light,
  [theme.breakpoints.down("sm")]: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
}));

const Appheader = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const categories = useSelector((state) => state.categories.list);
  const router = useRouter();
  const qty = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const open = Boolean(anchorEl);
  const [query, setQuery] = React.useState("");
  const dataList = useSelector((state) => state.searchProduct);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    let val = e.target.value;
    setQuery(val);
  };

  React.useEffect(() => {
    dispatch(searchProductAction(query));
    dispatch(getAllCategoryAction());
  }, [query]);

  return (
    <StyledHeaderContainer isShowDropdown={query}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap="10px"
        >
          <MobileDrawer />

          <StyledSearchbar
            width="100%"
            className="searchBarWrapper"
            isShowDropdown={query}
          >
            <SearchInput
              placeholder="Qidirish..."
              onChange={(e) => handleSearch(e)}
              startAdornment={
                <InputAdornment>
                  <StyledBtn
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    variant="contained"
                    size="small"
                  >
                    Kategoriyalar{" "}
                    {open ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "20px" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "20px" }} />
                    )}
                  </StyledBtn>
                  <MenuDropdown
                    data={categories}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    open={open}
                  />
                </InputAdornment>
              }
            />
            <Stack className="styledStack">
              <Collapse
                className="styledCollapse"
                id="searchBarPanel"
                in={dataList?.isOpen}
              >
                <Stack sx={{ background: "#fff" }}>
                  {dataList?.isLoading ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      py={1}
                    >
                      <CircularProgress size={30} color="primary" />
                    </Stack>
                  ) : undefined}
                  {dataList?.list?.products?.length ? (
                    dataList?.list?.products?.map((item) => (
                      <Stack
                        onClick={() => router.push(`/shop/${item?.uid}`)}
                        direction="row"
                        key={item?._id}
                        alignItems="center"
                        mt={0.5}
                        sx={{ p: 0.5, cursor: "pointer", background: "#fff" }}
                      >
                        <Avatar src={item?.image} />
                        <Stack ml={1}>
                          <Typography
                            sx={{ color: "#000000", fontSize: "12px" }}
                          >
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
              </Collapse>
            </Stack>
          </StyledSearchbar>

          <Stack direction="row" gap="10px">
            <MenuDropdownProfile user={user} />
          </Stack>
        </Stack>
      </Container>
    </StyledHeaderContainer>
  );
};

export default Appheader;
