import { Circle, Icon } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

const ProgressCheck = ({ isPassed = false }) => {
  return (
    <Circle
      size="2rem"
      border="2px"
      bg={isPassed ? "blue.400" : "gray.100"}
      borderColor={isPassed ? "blue.400" : "gray.100"}
      my={1}
    >
      <Icon as={FaCheck} fontSize="xs" color={"white"} />
    </Circle>
  );
};
export default ProgressCheck;
