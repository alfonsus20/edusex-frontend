import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuizResult } from "../api-fetch/quiz";
import QuizExplanation from "./QuizExplanation";

const QuizResult = () => {
  const { attemptId } = useParams();
  const [result, setResult] = useState({});

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const { data } = await getQuizResult(attemptId);
        setResult(data.data);
      } catch (error) {
        console.log({ error });
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
        </Flex>
        <Text
          color={result.status === "success" ? "blue.400" : "red.400"}
          textAlign="center"
          fontSize="2xl"
          fontWeight="semibold"
        >
          {result.status === "success" ? "Keren!!!" : "Coba lagi!!!"}
        </Text>
      </Box>
      <Box mb={10}>
        <Heading as="h2" size="md" mb={2}>
          Pembahasan
        </Heading>
        <VStack spacing={5} alignItems="stretch">
          {result.answers?.map((answer, index) => (
            <QuizExplanation
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
          as={Link}
          to="/topic"
        >
          Pelajari Materi Lainnya
        </Button>
      </Flex>
    </Box>
  );
};
export default QuizResult;
