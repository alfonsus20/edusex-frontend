import { Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      textAlign="center"
      py={4}
      bgColor="#65789B"
      color="white"
      fontWeight={600}
    >
      Developed with{" "}
      <Box as="span" color="red.400">
        ❤
      </Box>{" "}
      by Alfonsus Avianto Chandrawan
    </Box>
  );
};

export default Footer;
