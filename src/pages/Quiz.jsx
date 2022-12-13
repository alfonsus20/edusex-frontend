import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import trueAnswerImage from "../assets/true_ans.png";
import falseAnswerImage from "../assets/false_ans.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizQuestions, submitQuizAnswers } from "../api-fetch/quiz";

const Quiz = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { quizId } = useParams();
  const [pageIndex, setPageIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [modalType, setModalType] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const currentQuestion = questions[pageIndex] || {};
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const { data } = await getQuizQuestions(quizId);
        console.log({ data });
        setQuestions(data.data.questions);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchQuizQuestions();
  }, []);

  const saveAnswers = (optionId, isTrue) => {
    setAnswers((prev) => [
      ...prev,
      { question_id: currentQuestion.id, option_id: optionId },
    ]);

    if (isTrue) {
      setCurrentScore((prev) => prev + Math.ceil(100 / questions.length));
    }

    setModalType(isTrue ? "true_answer" : "false_answer");
    onOpen();
  };

  const continueToNextQuestion = () => {
    setPageIndex((prev) => prev + 1);
    setModalType("");
    onClose();
  };

  const submitAnswer = async () => {
    try {
      setIsSubmitting(true);
      const { data } = await submitQuizAnswers(+quizId, { answers });
      navigate(`/quiz/${data.data.id}/result`);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box mx="auto" maxW="7xl" pt={8} pb={12} px={4}>
      <Box>
        <Flex
          fontWeight="bold"
          justifyContent="space-between"
          fontSize="xl"
          mb={3}
        >
          <Text>Pertanyaan {pageIndex + 1}</Text>
          <Text>
            Score :{" "}
            <Text as="span" color="blue.400">
              {currentScore}
            </Text>
          </Text>
        </Flex>
        <Progress
          value={
            questions?.length > 0
              ? ((pageIndex + 1) * 100) / questions.length
              : 0
          }
          rounded="md"
        />
      </Box>
      <Box mt={6}>
        <Heading size="lg" mb={6}>
          {currentQuestion.question}
        </Heading>
        <Grid
          gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2, 1fr)" }}
          rowGap={8}
          columnGap={12}
        >
          {currentQuestion.options?.map((option) => (
            <GridItem
              key={option.id}
              bg={
                answers[pageIndex]
                  ? answers[pageIndex].option_id === option.id
                    ? option.is_true
                      ? "green.500"
                      : "red.400"
                    : "white"
                  : "white"
              }
              px={6}
              py={12}
              fontSize="xl"
              textAlign="center"
              cursor="pointer"
              color={
                answers[pageIndex]
                  ? answers[pageIndex].option_id === option.id
                    ? "white"
                    : "black"
                  : "black"
              }
              rounded="md"
              _hover={{ shadow: "xl" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => saveAnswers(option.id, option.is_true)}
            >
              {option.option}
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
        closeOnEsc={false}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalBody px={10} py={8}>
            {modalType === "true_answer" ? (
              <>
                <Heading
                  color="blue.400"
                  size="lg"
                  fontWeight="semibold"
                  as="h2"
                  textAlign="center"
                  mb={4}
                >
                  Yeay, Jawaban Kamu Benar!
                </Heading>
                <Image
                  src={trueAnswerImage}
                  w={60}
                  style={{ aspectRatio: 1 }}
                  alt="true answer"
                  mx="auto"
                  mb={4}
                />
                <Button
                  w="full"
                  colorScheme="blue"
                  size="lg"
                  onClick={
                    pageIndex === questions.length - 1
                      ? submitAnswer
                      : continueToNextQuestion
                  }
                  isLoading={isSubmitting}
                >
                  {pageIndex === questions.length - 1
                    ? "Akhiri Kuis"
                    : "Berikutnya"}
                </Button>
              </>
            ) : (
              <>
                <Heading
                  color="red.400"
                  size="lg"
                  fontWeight="semibold"
                  as="h2"
                  textAlign="center"
                  mb={4}
                >
                  Upss, Jawaban Kamu Salah!
                </Heading>
                <Image
                  src={falseAnswerImage}
                  w={60}
                  style={{ aspectRatio: 1 }}
                  alt="false answer"
                  mx="auto"
                  mb={4}
                />
                <Button
                  w="full"
                  colorScheme="red"
                  size="lg"
                  onClick={
                    pageIndex === questions.length - 1
                      ? submitAnswer
                      : continueToNextQuestion
                  }
                  isLoading={isSubmitting}
                >
                  {pageIndex === questions.length - 1
                    ? "Akhiri Kuis"
                    : "Berikutnya"}
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Quiz;
