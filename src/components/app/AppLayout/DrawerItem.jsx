import { useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  ListItem,
  ListItemButton,
  Stack,
  List,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";

const DrawerListItem = ({ name, route, icon, children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(router?.pathname?.includes(route));
  const handleToggle = () => {
    if (children) {
      setOpen((prevOpen) => !prevOpen);
    } else {
      router.push(route);
    }
  };

  return (
    <ListItem disablePadding>
      <Stack>
        <Button
          endIcon={
            !open && children ? (
              <ChevronRightIcon fontSize="small" />
            ) : open && children ? (
              <ExpandMoreIcon fontSize="small" />
            ) : null
          }
          disableRipple
          onClick={handleToggle}
          startIcon={icon(route, router?.pathname)}
          sx={{
            color: router?.pathname?.includes(route)
              ? "secondary.main"
              : "neutral.300",
            justifyContent: "flex-start",
            // pl: `24px`,
            // pr: 3,
            textAlign: "left",
            textTransform: "none",
            fontSize: "13px",
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.01)",
            },
            "& .MuiButton-startIcon": {
              // color: active ? "secondary.main" : "neutral.400",
            },
            "& .MuiButton-endIcon": {
              color: "neutral.400",
            },
          }}
        >
          {name}
        </Button>
        {children ? (
          <Collapse in={open} sx={{ mt: 0.5 }}>
            <List>
              {children.map((item, indx) => (
                <ListItem sx={{ marginLeft: "5px" }} disablePadding key={indx}>
                  <NextLink href={item.path}>
                    <ListItemButton
                      sx={{
                        fontSize: "12px",
                        color:
                          router?.pathname === item.path
                            ? "secondary.main"
                            : "neutral.300",
                      }}
                    >
                      {item.title}
                    </ListItemButton>
                  </NextLink>
                </ListItem>
              ))}
            </List>
          </Collapse>
        ) : null}
      </Stack>
    </ListItem>
  );
};

DrawerListItem.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.func,
  title: PropTypes.string.isRequired,
};

DrawerListItem.defaultProps = {
  icon: () => {},
};

export default DrawerListItem;
