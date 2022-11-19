import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const theme = extendTheme({
  colors: {
    blue: {
      500: "#5B8FF9",
      600: "#3878FC",
      700: "#226BFF",
    },
    yellow: {
      400: "#F6BD16",
      500: "#FABB02",
      600: "#FBBC03",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
