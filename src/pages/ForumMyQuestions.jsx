import { Box, Heading } from "@chakra-ui/react";
import CardDiscussion from "../components/CardDiscussion";

const ForumMyQuestions = () => {
  return (
    <Box pt={8} pb={12} mx="auto" maxW="6xl">
      <Heading size="lg" mb={4} as="h1">
        Forum Diskusi
      </Heading>
      <Heading size="md" mb={4} as="h2">
        Pertanyaan Saya
      </Heading>
      <Box>
        <CardDiscussion
          questionerName="Alfonsus"
          time="20 menit yang lalu"
          question="Bagaimana mencegah terjadinya penyakit HIV/AIDS?"
          numberOfRespond={1}
          psychologistName="William"
          questionId={1}
        />
        <CardDiscussion
          questionerName="Alfonsus"
          time="20 menit yang lalu"
          question="Bagaimana mencegah terjadinya penyakit HIV/AIDS?"
          numberOfRespond={1}
          psychologistName="William"
          questionId={1}
        />
        <CardDiscussion
          questionerName="Alfonsus"
          time="20 menit yang lalu"
          question="Bagaimana mencegah terjadinya penyakit HIV/AIDS?"
          numberOfRespond={1}
          psychologistName="William"
          questionId={1}
        />
      </Box>
    </Box>
  );
};

export default ForumMyQuestions;
