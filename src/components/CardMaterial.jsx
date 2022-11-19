import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardMaterial = ({ image, id, title }) => {
  return (
    <GridItem as={Link} to={`/material/${id}`} role="group">
      <Image
        src={image}
        alt={title}
        rounded="md"
        w="full"
        style={{ aspectRatio: "16/9" }}
        objectPosition="center"
        objectFit="cover"
        mb={1}
      />
      <Text _groupHover={{ color: "blue.500" }} fontWeight={600}>
        {title}
      </Text>
    </GridItem>
  );
};

export default CardMaterial;
