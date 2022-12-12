import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import CardDiscussion from "../components/CardDiscussion";
import { Link } from "react-router-dom";
import { getAllQuestions } from "../api-fetch/discussion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTopicContext } from "../context/topicContext";

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [filterTopicIndex, setFilterTopicIndex] = useState(0);
  const [filterKeyword, setFilterKeyword] = useState("");
  const { topics } = useTopicContext();
  const searchRef = useRef();

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const { data } = await getAllQuestions();
        setQuestions(data.data);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchAllQuestions();
  }, []);

  const filteredQuestions = useMemo(() => {
    let returnedValue = [...questions];
    if (filterTopicIndex !== 0) {
      returnedValue = returnedValue.filter(
        (question) => question.topic?.id === topics[filterTopicIndex - 1]?.id
      );
    }

    if (filterKeyword) {
      returnedValue = returnedValue.filter((question) =>
        question.question?.includes(filterKeyword)
      );
    }

    return returnedValue;
  }, [questions, filterTopicIndex, filterKeyword]);

  const handleSearchByKeyword = useCallback(() => {
    setFilterKeyword(searchRef.current.value);
  }, []);

  return (
    <Box pt={8} pb={12} mx="auto" maxW="6xl" px={4}>
      <Heading size="lg" mb={4}>
        Forum Diskusi
      </Heading>
      <Flex
        mb={8}
        gap={4}
        justifyContent={{ base: "center", sm: "flex-start" }}
        flexWrap="wrap"
      >
        <Button
          leftIcon={<Icon as={RiPencilFill} />}
          colorScheme="blue"
          variant="outline"
          size={{ base: "md", sm: "lg" }}
          as={Link}
          to="/forum/ask"
        >
          Buat Pertanyaan
        </Button>
        <Button
          colorScheme="blue"
          size={{ base: "md", sm: "lg" }}
          leftIcon={<Icon as={BsChatSquareDotsFill} />}
          as={Link}
          to="/forum/my-questions"
        >
          Pertanyaan Saya
        </Button>
      </Flex>
      <Box mb={4}>
        <Heading size="md" mb={4}>
          Diskusi Terbaru
        </Heading>
        <Flex mb={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaSearch} color="gray.300" />}
            />
            <Input mr={4} ref={searchRef} placeholder="Cari pertanyaan...." />
          </InputGroup>
          <Button colorScheme="orange" px={10} onClick={handleSearchByKeyword}>
            Cari
          </Button>
        </Flex>
        <Flex alignItems="center">
          <Text mr={3}>Topik: </Text>
          <Tabs
            variant="soft-rounded"
            colorScheme="orange"
            onChange={(val) => setFilterTopicIndex(val)}
            overflowX="auto"
          >
            <TabList gap={2}>
              <Tab
                px={6}
                py={1}
                color="orange.500"
                border="2px"
                _selected={{ bg: "orange.500", color: "white" }}
              >
                Semua
              </Tab>
              {topics.map((topic) => (
                <Tab
                  px={6}
                  py={1}
                  color="orange.500"
                  border="2px"
                  whiteSpace="nowrap"
                  _selected={{ bg: "orange.500", color: "white" }}
                >
                  {topic.name}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </Flex>
      </Box>
      <Box>
        {filteredQuestions.map((question) => (
          <CardDiscussion
            key={question.id}
            questionerName={question.user?.name}
            time={question.created_at}
            question={question.question}
            numberOfRespond={question.replies?.length}
            psychologistName={
              question.replies?.find((reply) => reply.user?.role === "psikolog")
                ?.user?.name
            }
            questionId={question.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Forum;
