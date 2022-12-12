import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthWrapper } from "./context/authContext";
import { TopicWrapper } from "./context/topicContext";
import "./index.css";
import { initSW } from "./utils/helper";

const theme = extendTheme({
  colors: {
    blue: {
      500: "#5B8FF9",
      600: "#3878FC",
      700: "#226BFF",
      800: "#7262FD",
    },
    yellow: {
      400: "#F6BD16",
      500: "#FABB02",
      600: "#FBBC03",
    },
    orange: {
      500: "#F6903D",
      600: "#FF7E14",
      700: "#FF7402",
    },
    pink: {
      500: "#F08BB4",
      600: "#E883AC",
      700: "#D9789F",
    },
    green: {
      500: "#61DDAA",
      600: "#5AD7A4",
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <AuthWrapper>
      <TopicWrapper>
        <App />
      </TopicWrapper>
    </AuthWrapper>
  </ChakraProvider>
);

initSW();
