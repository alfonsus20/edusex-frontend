import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { DEFAULT_AVATAR } from "../utils/constant";
import { useTopicContext } from "../context/topicContext";
import * as Yup from "yup";
import { useMemo, useState } from "react";
import { useFormik } from "formik";
import { askQuestion } from "../api-fetch/discussion";
import { useNavigate } from "react-router-dom";

const ForumAskQuestion = () => {
  const { topics } = useTopicContext();
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const AskQuestionSchema = useMemo(
    () =>
      Yup.object({
        question: Yup.string().required(),
        topic_id: Yup.string()
          .oneOf(topics.map((topic) => `${topic.id}`))
          .required(),
      }),
    [topics]
  );

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await askQuestion({ ...data, topic_id: +data.topic_id });
      toast({
        title: "Sukses",
        description: "Pertanyaan berhasil dibuat",
        status: "success",
      });
      navigate("/forum/my-questions");
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    validationSchema: AskQuestionSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    initialValues: {
      question: "",
      topic_id: "",
    },
  });

  return (
    <Box pt={8} px={4} pb={12} mx="auto" maxW="6xl">
      <Heading size="lg" mb={4} as="h1">
        Forum Diskusi
      </Heading>
      <Heading size="md" mb={4} as="h2">
        Buat Pertanyaan
      </Heading>
      <Flex>
        <Image
          w={{ base: 12, sm: 14 }}
          h={{ base: 12, sm: 14 }}
          rounded="full"
          src={DEFAULT_AVATAR}
          alt="avatar"
          mr={4}
        />
        <Box flex="auto" pt={2} as="form" onSubmit={formik.handleSubmit}>
          <FormControl isInvalid={!!formik.errors.question} mb={4}>
            <FormLabel
              fontSize="md"
              htmlFor="question"
              fontWeight="semibold"
              mb={3}
            >
              Pertanyaan
            </FormLabel>
            <Textarea
              id="question"
              placeholder="Ketikkan pertanyaanmu"
              resize="none"
              rows={5}
              value={formik.values.question}
              onChange={formik.handleChange}
            />{" "}
            <FormErrorMessage>{formik.errors.question}</FormErrorMessage>
          </FormControl>
          <Text fontSize="md" fontWeight="semibold" mb={3}>
            Topik
          </Text>
          <FormControl isInvalid={!!formik.errors.topic_id} mb={8}>
            <Select
              placeholder="Pilih topik"
              id="topic_id"
              onChange={(e) => formik.setFieldValue("topic_id", e.target.value)}
            >
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </Select>{" "}
            <FormErrorMessage>{formik.errors.topic_id}</FormErrorMessage>
          </FormControl>
          <Flex>
            <Button
              ml="auto"
              colorScheme="blue"
              px={8}
              type="submit"
              isLoading={isLoading}
            >
              Kirim
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ForumAskQuestion;
