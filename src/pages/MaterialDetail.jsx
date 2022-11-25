import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { getEmbedYoutubeURL } from "../utils/helper";
import ornament from "../assets/kerjakan_kuis_ornament.svg";
import { useEffect, useState } from "react";
import { getMaterialById } from "../api-fetch/material";

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
      <Box maxW="4xl" mx="auto">
        <Box mb={4}>
          <Box mb={2}>
            <Heading as="h2" size="lg" mb={2}>
              {material.title}
            </Heading>
            <Text>Minggu, 14 Oktober 2022</Text>
          </Box>
          <Image
            src="https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/material-thumbnail/image%2028.png?t=2022-11-19T09%3A24%3A53.285Z"
            w="full"
            style={{ aspectRatio: "16/9" }}
            mx="auto"
          />
          <VStack>
            {[1, 2, 3, 4].map((t) => (
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                debitis sit illum laudantium delectus, minima possimus, quasi
                animi ipsa beatae, placeat quae eius aperiam rerum totam
                veritatis dolore accusantium? Ullam. Quisquam sunt nulla rerum
                corrupti, dolor placeat fugit distinctio veniam at. Officiis
                veniam tempora ipsum eum, recusandae architecto cum aliquam
                earum maxime magni dolore quaerat quasi laborum? Impedit, ipsam
                amet? Nihil eligendi eveniet molestiae cum magnam qui numquam
                repellendus? Adipisci aut obcaecati dicta unde. Dicta, placeat?
                Nihil eos deserunt nulla quos omnis exercitationem a maxime,
                incidunt quidem repudiandae accusantium aspernatur? Incidunt
              </Box>
            ))}
          </VStack>
        </Box>
        <Heading as="h3" size="lg" mb={4}>
          Video
        </Heading>
        <AspectRatio w="full" ratio={16 / 9} mb={10}>
          <iframe
            title="video"
            src={getEmbedYoutubeURL(
              "https://www.youtube.com/watch?v=vEIPJyYOSJI"
            )}
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
      >
        <Image
          src={ornament}
          alt="ornament"
          pos="absolute"
          right={0}
          top={0}
          width={40}
        />
        <Text mb={4} fontSize="3xl" fontWeight="semibold">
          Yuk, Kerjakan Mini Kuis
        </Text>
        <Text mb={4} fontSize="lg" maxW="2xl" textAlign="center">
          Terdapat mini kuis yang dapat kamu kerjakan untuk menguji pemahamanmu
          terkait materi yang baru kamu pelajari
        </Text>
        <Button
          colorScheme="pink"
          rounded="full"
          px={6}
          as={Link}
          to={`/material/${materialId}/quiz-info`}
        >
          Kerjakan Kuis
        </Button>
      </Flex>
    </Box>
  );
};

export default MaterialDetail;
