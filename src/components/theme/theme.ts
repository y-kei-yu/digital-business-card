import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      ".user-description h1": {
        fontSize: "2xl",
        fontWeight: "bold",
        marginBottom: "0.5em",
      },
      ".user-description h2": {
        fontSize: "xl",
        fontWeight: "semibold",
        marginBottom: "0.4em",
      },
      ".user-description p": {
        marginBottom: "0.5em",
      },
    },
  },
});

export default theme;
