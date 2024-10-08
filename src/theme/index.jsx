import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import baseTheme from "theme/light/baseTheme";
import { createTheme } from "./admin";
import { useRouter } from "next/router";

const MuiTheme = ({ children }) => {
  let themeAdmin = createTheme({
    mode: "light",
    responsiveFontSizes: responsiveFontSizes,
  });

  const router = useRouter();
  let theme = responsiveFontSizes(baseTheme);
  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";

  if (router.pathname.startsWith("/admin")) {
    return (
      <ThemeProvider theme={themeAdmin}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
