import {
  Flex,
  Heading,
  VStack,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { auth, googleProvider } from "../config/firebase";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import getURLSummary from "../config/APIFunctions";

export default function Home() {
  const toast = useToast();
  const [myArticleURL, setArticleURL] = useState("");
  const handleArticleURL = (event) => setArticleURL(event.target.value);

  const articlesCollectionRef = collection(db, auth?.currentUser?.uid);

  const addArticle = async () => {
    try {
      await addDoc(articlesCollectionRef, {
        articleURL: myArticleURL,
        summary: articleSummary,
        title: articleTitle,
        image: articleImage,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error Updating Database! Please try again!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Flex flexDir={"column"} justify={"center"}>
        <VStack>
          <Heading
            fontSize={{ base: "55px", md: "83px", lg: "98px" }}
            bgGradient="linear(to-r, #647DEE, #7F53AC)"
            bgClip={"text"}
          >
            TLDR
          </Heading>
          <Text fontSize={{ base: "33px", md: "55px", lg: "71px" }}>
            Easily summarize your articles
          </Text>
          <Flex width={"70vw"}>
            <Input
              value={myArticleURL}
              onChange={handleArticleURL}
              borderColor={"blackAlpha.400"}
              placeholder="Article URL Here"
              size={"lg"}
            ></Input>
          </Flex>

          <Button
            onClick={() => {
              if (myArticleURL != "" || myArticleURL != null) {
                getURLSummary(myArticleURL);
              } else {
                toast({
                  title: "Error",
                  description: "Please enter a valid URL!",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
            margin={"25px"}
            padding={"35px"}
            bgGradient={"linear(to-r, #F6D285, #BBF0F3)"}
            fontSize={"20px"}
            fontWeight={"bold"}
          >
            TLDR This!
          </Button>
        </VStack>
      </Flex>
    </>
  );
}
