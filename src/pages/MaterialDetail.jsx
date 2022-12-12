import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { getEmbedYoutubeURL } from "../utils/helper";
import ornament from "../assets/kerjakan_kuis_ornament.svg";
import { useEffect, useState } from "react";
import { getMaterialById } from "../api-fetch/material";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

const MaterialDetail = () => {
  const { materialId } = useParams();
  const [material, setMaterial] = useState({});

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const { data } = await getMaterialById(materialId);
        setMaterial(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMaterial();
  }, []);

  return (
    <Box>
      <Box maxW="4xl" mx="auto" px={4}>
        <Box mb={4}>
          <Box mb={2}>
            <Heading as="h2" size="lg" mb={2}>
              {material.title}
            </Heading>
            <Text>
              {dayjs(material.created_at).format("dddd, DD MMMM YYYY")}
            </Text>
          </Box>
          <Image
            src={material.illustration_url}
            w="full"
            style={{ aspectRatio: "16/9" }}
            mx="auto"
            mb={2}
          />
          <Box dangerouslySetInnerHTML={{ __html: material.content }} />
        </Box>
        <Heading as="h3" size="lg" mb={4}>
          Video
        </Heading>
        <AspectRatio w="full" ratio={16 / 9} mb={10}>
          <iframe
            title="video"
            src={getEmbedYoutubeURL(material.video_url || "")}
            allowFullScreen
          />
        </AspectRatio>
      </Box>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        bg="blue.800"
        color="white"
        py={20}
        pos="relative"
        px={4}
      >
        <Image
          src={ornament}
          alt="ornament"
          pos="absolute"
          right={0}
          top={0}
          width={40}
          display={{ base: "none", sm: "block" }}
        />
        <Text mb={4} fontSize="3xl" fontWeight="semibold" zIndex={10}>
          Yuk, Kerjakan Mini Kuis
        </Text>
        <Text mb={4} fontSize="lg" maxW="2xl" textAlign="center" zIndex={10}>
          Terdapat mini kuis yang dapat kamu kerjakan untuk menguji pemahamanmu
          terkait materi yang baru kamu pelajari
        </Text>
        <Button
          zIndex={10}
          colorScheme="pink"
          rounded="full"
          px={6}
          as={Link}
          to={`/quiz/${material.quiz?.id}/quiz-info`}
        >
          Kerjakan Kuis
        </Button>
      </Flex>
    </Box>
  );
};

export default MaterialDetail;
