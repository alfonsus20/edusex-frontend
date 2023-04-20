import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getMyQuestions } from "../api-fetch/discussion";
import CardDiscussion from "../components/card/CardDiscussion";

const ForumMyQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchMyQuestions = async () => {
      try {
        const { data } = await getMyQuestions();
        setQuestions(data.data);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchMyQuestions();
  }, []);

  return (
    <Box pt={8} px={4} pb={12} mx="auto" maxW="6xl">
      <Heading size="lg" mb={4} as="h1">
        Forum Diskusi
      </Heading>
      <Heading size="md" mb={4} as="h2">
        Pertanyaan Saya
      </Heading>
      <Box>
        {questions.length === 0 ? (
          <Text textAlign="center" py={4}>
            Belum ada pertanyaan
          </Text>
        ) : (
          questions.map((question) => (
            <CardDiscussion
              key={question.id}
              questionerName={question.user?.name}
              time={question.created_at}
              question={question.question}
              numberOfRespond={question.replies?.length}
              psychologistName={
                question.replies?.find(
                  (reply) => reply.user?.role === "psikolog"
                )?.user?.name
              }
              questionId={question.id}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default ForumMyQuestions;
