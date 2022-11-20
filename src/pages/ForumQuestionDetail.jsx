import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ForumQuestionDetail = () => {
  const { questionId } = useParams();

  return <Box>ForumQuestionDetail</Box>;
};

export default ForumQuestionDetail;
