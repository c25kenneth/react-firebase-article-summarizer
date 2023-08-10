import { useState } from "react";
import ReactIcon from "../assets/react.svg";
import UndrawNews from "../assets/UndrawNews.svg";
import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Divider,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Image,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const handleEmail = (event) => setEmail(event.target.value);

  const [password, setPassword] = useState("");
  const handlePassword = (event) => setPassword(event.target.value);

  const toast = useToast();
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          navigate("/home");
        }
      );
    } catch (e) {
      toast({
        title: "Error",
        description: "Error Signing In! Please Try Again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((userCredential) => {
        navigate("/home");
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Error Signing In! Please Try Again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(e);
    }
  };
  return (
    <>
      <Stack flexDir={"row"} backgroundColor={"gray.300"}>
        <Flex
          flexDirection="column"
          width="50vw"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="teal.500" />
            <Heading color="teal.400">Welcome Back</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaUserAlt color="gray.300" />}
                    />
                    <Input
                      placeholder="email address"
                      value={email}
                      onChange={handleEmail}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<FaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={handlePassword}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={() => {
                    signIn();
                  }}
                >
                  Login
                </Button>
                <Flex align="center">
                  <Divider borderColor={"black"} />
                  <Text padding="2">OR</Text>
                  <Divider borderColor={"black"} />
                </Flex>

                <Button
                  rightIcon={<FaGoogle />}
                  colorScheme="blue"
                  onClick={() => {
                    signInWithGoogle();
                  }}
                >
                  Sign In with Google
                </Button>
              </Stack>
            </Box>
          </Stack>
          <Box>
            New to us?{" "}
            <Link color="teal.500" href="/register">
              Sign Up
            </Link>
          </Box>
        </Flex>
        <Flex
          flexDirection="column"
          width="30vw"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={UndrawNews} width="90vw" height="50vh" />
        </Flex>
      </Stack>
    </>
  );
}
