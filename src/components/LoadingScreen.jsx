import { CircularProgress, Flex } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      w="full"
      h="full"
      flex={1}
    >
      <CircularProgress isIndeterminate color="blue.400" size={20} />
    </Flex>
  );
};

export default LoadingScreen;
