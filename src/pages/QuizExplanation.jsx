import { Box, Flex, Icon, Text, VStack, Skeleton } from "@chakra-ui/react";
import { FaCheckCircle, FaRegTimesCircle, FaRegCircle } from "react-icons/fa";

const QuizExplanation = ({
  number,
  userAnswerId,
  options,
  explanation,
  question,
  isLoading = false,
}) => {
  const getColorAndIcon = (optionId, isTrueAnswer) => {
    let icon = null;
    let color = "";

    if (isTrueAnswer) {
      color = "green.400";
      icon = FaCheckCircle;
    } else if (optionId === userAnswerId) {
      color = "red.400";
      icon = FaRegTimesCircle;
    } else {
      color = "gray.800";
      icon = FaRegCircle;
    }

    return { icon, color };
  };

  if (isLoading) {
    return <Skeleton height={60} />;
  }

  return (
    <Flex fontSize="lg">
      <Box mr={4}>{number}.</Box>
      <Box flex="auto">
        <Text mb={3}>{question}</Text>
        <VStack alignItems="stretch" mb={3}>
          {options?.map((option) => {
            const { icon, color } = getColorAndIcon(option.id, option.is_true);
            return (
              <Flex
                key={option.id}
                alignItems="center"
                fontSize="lg"
                border="2px"
                borderColor={color}
                p={2}
                color={color}
                rounded="md"
              >
                <Icon as={icon} mr={2} />
                <Text>{option.option}</Text>
              </Flex>
            );
          })}
        </VStack>
        <Text fontWeight="bold" mb={2}>
          Penjelasan
        </Text>
        <Text>{explanation}</Text>
      </Box>
    </Flex>
  );
};
export default QuizExplanation;
