import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Image,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionDetail, postQuestionReply } from "../../api-fetch/discussion";
import QuestionReply from "../../components/QuestionReply";
import { useAuthContext } from "../../context/authContext";
import { DEFAULT_AVATAR } from "../../utils/constant";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { showName } from "../../utils/helper";

dayjs.locale("id");

const PsikologQuestionDetail = () => {
  const { questionId } = useParams();
  const [questionDetail, setQuestionDetail] = useState({});
  const { userInfo } = useAuthContext();
  const [reply, setReply] = useState("");
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchQuestionDetail = useCallback(async () => {
    try {
      const { data } = await getQuestionDetail(questionId);
      setQuestionDetail(data.data);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const getUserRole = useCallback(
    (role, answererId) => {
      switch (role) {
        case "psikolog":
          return "Psikolog";
        case "user":
          if (questionDetail.user?.id === answererId) {
            return "Penanya";
          } else {
            return "Anggota";
          }
        default:
          return "";
      }
    },
    [questionDetail, userInfo]
  );

  const handleSubmitReply = useCallback(async () => {
    try {
      setIsSubmitting(true);
      await postQuestionReply({ reply }, questionId);
      toast({
        status: "success",
        title: "Sukses",
        description: "Jawaban berhasil terkirim",
      });
      setReply("");
      await fetchQuestionDetail();
    } catch (error) {
      console.log({ error });
    } finally {
      setIsSubmitting(false);
    }
  }, [reply, questionId]);

  useEffect(() => {
    fetchQuestionDetail();
  }, []);

  return (
    <Box pb={8} px={4}>
      <Heading size="lg" fontWeight="semibold" mb={6}>
        Jawab Pertanyaan
      </Heading>
      <Box mb={4}>
        <Flex gap={4} mb={2} alignItems="center">
          <Circle size={14} bg="blue.200" fontSize="3xl" color="white">
            {questionDetail.user?.name[0].toUpperCase()}
          </Circle>
          <Box flex="auto">
            <Text fontWeight="bold">
              {showName(
                questionDetail.user?.name,
                getUserRole(questionDetail.user?.role)
              )}
            </Text>
            <Text>Penanya</Text>
          </Box>
          <Box textAlign="right">
            <Text>
              {dayjs(questionDetail.created_at).format("DD MMMM YYYY")}
            </Text>
            <Text>{dayjs(questionDetail.created_at).format("HH:mm")}</Text>
          </Box>
        </Flex>
        <Text>{questionDetail.question}</Text>
      </Box>
      <Box ml={4} mb={8}>
        <Heading size="sm" mb={4}>
          Balasan
        </Heading>
        <VStack spacing={6} mb={6} alignItems="stretch">
          {questionDetail.replies &&
            (questionDetail.replies.length === 0 ? (
              <Text textAlign="center">Belum ada jawaban</Text>
            ) : (
              questionDetail.replies?.map((reply) => (
                <QuestionReply
                  key={reply.id}
                  reply={reply.reply}
                  userName={reply.user?.name}
                  role={getUserRole(reply.user?.role, reply.user?.id)}
                  date={reply.created_at}
                  avatar={reply.user?.avatar_url}
                />
              ))
            ))}
        </VStack>
        <Flex>
          <Image
            w={{ base: 12, sm: 14 }}
            h={{ base: 12, sm: 14 }}
            rounded="full"
            src={userInfo.avatar_url || DEFAULT_AVATAR}
            alt="avatar"
            mr={4}
            objectFit="cover"
            objectPosition="center"
          />
          <Box flex="auto" pt={2}>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Berikan Komentar
            </Text>
            <Textarea
              placeholder="Ketikkan komentarmu"
              resize="none"
              rows={5}
              mb={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <Flex>
              <Button
                ml="auto"
                colorScheme="blue"
                px={8}
                isDisabled={!reply}
                onClick={handleSubmitReply}
                isLoading={isSubmitting}
              >
                Kirim
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default PsikologQuestionDetail;
