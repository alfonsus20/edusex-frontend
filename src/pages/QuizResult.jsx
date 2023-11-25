import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuizResult } from "../api-fetch/quiz";
import QuizExplanation from "./QuizExplanation";
import { generateSkeletons } from "../utils/helper";

const QuizResult = () => {
  const { attemptId } = useParams();
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const { data } = await getQuizResult(attemptId);
        setResult(data.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizResult();
  }, []);

  return (
    <Box pt={8} pb={12} mx="auto" maxW="7xl" px={4}>
      <Box>
        <Heading size="lg" fontWeight="bold" textAlign="center" mb={6}>
          Skor Kamu
        </Heading>
        <Flex>
          <SkeletonCircle isLoaded={!isLoading} size={52} mx="auto">
            <CircularProgress
              value={result.score}
              size={52}
              thickness={4}
              mx="auto"
              color={result.status === "success" ? "blue.400" : "red.400"}
            >
              <CircularProgressLabel
                fontSize="6xl"
                fontWeight="semibold"
                color={
                  result.status
                    ? result.status === "success"
                      ? "blue.400"
                      : "red.400"
                    : "transparent"
                }
              >
                {result.score}
              </CircularProgressLabel>
            </CircularProgress>
          </SkeletonCircle>
        </Flex>
        <Skeleton isLoaded={!isLoading} w={40} mx="auto" mt={4}>
          <Text
            color={result.status === "success" ? "blue.400" : "red.400"}
            textAlign="center"
            fontSize="2xl"
            fontWeight="semibold"
          >
            {result.status === "success" ? "Keren!!!" : "Coba lagi!!!"}
          </Text>
        </Skeleton>
      </Box>
      <Box mb={10}>
        <Heading as="h2" size="md" mb={2}>
          Pembahasan
        </Heading>
        <VStack spacing={5} alignItems="stretch">
          {isLoading
            ? generateSkeletons(5, QuizExplanation)
            : result.answers?.map((answer, index) => (
                <QuizExplanation
                  key={index}
                  userAnswerId={answer.option?.id}
                  number={index + 1}
                  question={answer.question?.question}
                  options={answer.question?.options}
                  explanation={answer.question?.explanation}
                />
              ))}
        </VStack>
      </Box>
      <Flex>
        <Button
          size="lg"
          mx="auto"
          colorScheme="purple"
          px={8}
          as={isLoading ? "button" : Link}
          to="/topic"
          isLoading={isLoading}
        >
          Pelajari Materi Lainnya
        </Button>
      </Flex>
    </Box>
  );
};
export default QuizResult;
