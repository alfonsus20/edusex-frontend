import {
  GridItem,
  Image,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardMaterial = ({ image, id, title, isLoading = false }) => {
  return (
    <GridItem as={isLoading ? "div" : Link} to={`/material/${id}`} role="group">
      <Skeleton isLoaded={!isLoading} mb={2}>
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
      </Skeleton>
      <SkeletonText isLoaded={!isLoading} skeletonHeight={4} noOfLines={2}>
        <Text _groupHover={{ color: "blue.500" }} fontWeight={600}>
          {title}
        </Text>
      </SkeletonText>
    </GridItem>
  );
};

export default CardMaterial;
