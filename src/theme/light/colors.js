const primary = {
  main: "#08cf65",
  light: "#04ba71",
  dark: "#007860",
  contrastText: "#ffffff",
  border: "#E8E9F8",
  100: "#F4F0F1",
  200: "rgba(241, 11, 66, 0.06)",
  300: "#F5F6F8",
  400: "#F0F3F9",
  500: "#F9F9F9",
};

const secondary = {
  main: "#08cf65",
  dark: "#5048E5",
  light: "#F3F5F7",
  contrastText: "#566A7F",
  thin: "rgba(86, 106, 127, 0.1)",
};

const success = {
  main: "#14B8A6",
  light: "#43C6B7",
  dark: "#0E8074",
  contrastText: "#FFFFFF",
  100: "#E7F9ED",
  200: "#C2F1D1",
  300: "#99E8B3",
  400: "#52D77E",
  500: "#33D067",
  600: "#2ECB5F",
  700: "#27C454",
  800: "#20BE4A",
  900: "#0b7724",
};

const neutral = {
  main: "rgba(86, 106, 127, 0.1)",
  100: "rgba(60, 81, 134, 0.5)",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: "#FFFFFF",
  50: "#f3f5f9",
  100: "#DBF0FE",
  200: "#B8DEFE",
  300: "#94C9FE",
  400: "#7AB6FD",
  500: "#4E97FD",
  600: "#3975D9",
  700: "#2756B6",
  800: "#183C92",
  900: "#0E2979",
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  contrastText: "#FFFFFF",
  100: "#FFF8E5",
  contrastText: "#FFFFFF",
};

const error = {
  main: "#FF3333",
  light: "#FFE7E7",
  dark: "#922E2E",
  contrastText: "#FFFFFF",
  100: "#FFEAEA",
  200: "#FFCBCB",
  300: "#FFA9A9",
  400: "#FF6D6D",
  500: "#FF5353",
  600: "#FF4C4C",
  700: "#FF4242",
  800: "#FF3939",
  900: "#FF2929",
};

const background = {
  main: "#BDC4CD",
  default: "#F9FAFC",
  dark: "#1b2530e0",
  paper: "#FFFFFF",
  thin: "rgba(255, 255, 255, 0.6)",
  primary: "#EFF2F4",
  input: "#F4F7FB",
  borderColor: "#979797",
  blue: "#33C2FF",
  hover: "rgba(255,2555,255, 0.3)",
  border: "#D8DEEA",
  mobileBar: "#F1DBE0",
  lightPurple: "#ebf5f3",
  lightGrey: "#E4E4E4",
  border2: "#2E0661",
  services: "#F2F2F2",
  veryLightPurple: "#F4F0F8",
  100: "#ebf5f3",
};

const black = {
  main: "#000000",
  dark: "#000",
};

const disabled = {
  main: "#C4C2BF",
  contrastText: "#ffffff",
};

const text = {
  white: "#ffffff",
  whiteOff: "rgba(255, 255, 255, 0.8)",
  gray: "#ffffffbf",
  main: "#092C4C",
  light: "#606060",
  dark: "#000000",
  lightDark: "#535A56",
  primary: "#505050",
  black: "#000000",
  mixedBlack: "#2F2F2F",
  100: "#505050",
  200: "#FFFFFF",
  300: "#667085",
};

const divider = "#E6E8F0";

export const palette = {
  primary: primary,
  secondary: secondary,
  success: success,
  info: info,
  warning: warning,
  error: error,
  text: text,
  divider: divider,
  background: background,
  neutral: neutral,
  black: black,
  disabled: disabled,
  action: {
    active: neutral[500],
    focus: "rgba(55, 65, 81, 0.12)",
    hover: "rgba(55, 65, 81, 0.04)",
    selected: "rgba(55, 65, 81, 0.08)",
    disabledBackground: "rgba(55, 65, 81, 0.12)",
    disabled: "rgba(55, 65, 81, 0.26)",
  },
};
