import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Text,
  Heading,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import React from "react";

export default function ArticleCard({
  articleTitle,
  articleSummary,
  articleURL,
  articleImage,
}) {
  return (
    <Flex justify={"center"} marginTop={"35px"}>
      <Box boxShadow={"2xl"} width={"80vw"}>
        <Card
          backgroundColor={"gray.200"}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={articleImage}
            alt="Caffe Latte"
          />
          <CardHeader>
            <Heading>{articleTitle}</Heading>
          </CardHeader>

          <CardBody>
            <Text>{articleSummary}</Text>
          </CardBody>

          <CardFooter>
            <Button
              onClick={() => {
                window.open(articleURL, "_blank");
              }}
            >
              Visit Article
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </Flex>
  );
}
