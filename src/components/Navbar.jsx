import React from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaNewspaper } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  var title =
    location.pathname == "/home" ? "View Past Articles" : "Return Home";

  const navigatePages = () => {
    if (location.pathname == "/home") {
      navigate("/history");
    } else if (location.pathname == "/history") {
      navigate("/home");
    }
  };
  return (
    <div>
      <Flex alignItems={"center"}>
        <Heading
          m={"10px"}
          onClick={() => {
            console.log(location.pathname);
            navigate("/home");
          }}
        >
          EasyTLDR
        </Heading>
        <Spacer />
        <HStack spacing={"25px"}>
          <Button
            leftIcon={
              location.pathname == "/home" ? <FaNewspaper /> : <FaHome />
            }
            colorScheme="blue"
            variant="solid"
            onClick={() => {
              navigatePages();
            }}
          >
            {title}
          </Button>
          <Button
            bgColor={"green.500"}
            m={15}
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </Button>
        </HStack>
      </Flex>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
