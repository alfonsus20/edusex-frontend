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
import { Link, useParams } from "react-router-dom";
import QuizExplanation from "./QuizExplanation";

const QuizResult = () => {
  const { attemptId } = useParams();

  return (
    <Box pt={8} pb={12} mx="auto" maxW="7xl">
      <Box>
        <Heading size="lg" fontWeight="bold" textAlign="center" mb={6}>
          Skor Kamu
        </Heading>
        <Flex>
          <CircularProgress
            value={90}
            size={52}
            thickness={4}
            mx="auto"
            color="blue.400"
          >
            <CircularProgressLabel
              fontSize="6xl"
              fontWeight="semibold"
              color="blue.400"
            >
              90
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Text
          color="blue.400"
          textAlign="center"
          fontSize="2xl"
          fontWeight="semibold"
        >
          Keren!!!
        </Text>
      </Box>
      <Box mb={10}>
        <Heading as="h2" size="md" mb={2}>
          Pembahasan
        </Heading>
        <VStack spacing={5}>
          <QuizExplanation
            userAnswerId={2}
            trueAnswerId={2}
            number={1}
            options={[
              { id: 1, option: "test 1" },
              { id: 2, option: "test 2" },
              { id: 3, option: "test 3" },
            ]}
            explanation="
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut iste nulla nisi molestiae quod voluptates ducimus maiores labore, nemo illo asperiores a adipisci possimus perferendis quidem laudantium distinctio reiciendis delectus?
          Mollitia minima autem sed provident asperiores repellendus officiis omnis earum quaerat architecto dolorem inventore nobis, ipsam perspiciatis optio, odit, blanditiis necessitatibus eligendi reiciendis quia exercitationem. Esse distinctio itaque corrupti repellendus."
          />

          <QuizExplanation
            userAnswerId={1}
            trueAnswerId={2}
            number={2}
            options={[
              { id: 1, option: "test 1" },
              { id: 2, option: "test 2" },
              { id: 3, option: "test 3" },
            ]}
            explanation="
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut iste nulla nisi molestiae quod voluptates ducimus maiores labore, nemo illo asperiores a adipisci possimus perferendis quidem laudantium distinctio reiciendis delectus?
          Mollitia minima autem sed provident asperiores repellendus officiis omnis earum quaerat architecto dolorem inventore nobis, ipsam perspiciatis optio, odit, blanditiis necessitatibus eligendi reiciendis quia exercitationem. Esse distinctio itaque corrupti repellendus."
          />
        </VStack>
      </Box>
      <Flex>
        <Button size="lg" mx="auto" colorScheme='purple' px={8} as={Link} to='/topic'>
          Pelajari Materi Lainnya
        </Button>
      </Flex>
    </Box>
  );
};
export default QuizResult;
