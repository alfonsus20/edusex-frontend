import { Box, Flex, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex
      as="footer"
      textAlign="center"
      py={4}
      bgColor="#65789B"
      color="white"
      alignItems="center"
      justifyContent='center'
      fontWeight={600}
    >
      Developed with <Icon as={FaHeart} color="red.400" mx={1} /> by Alfonsus
      Avianto Chandrawan
    </Flex>
  );
};

export default Footer;
