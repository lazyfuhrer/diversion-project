import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";


function Footer() {
  return (
    <Box
      position="absolute"
      top="100vh"
      width="100%"
      /*color={useColorModeValue("gray.700", "gray.800")}*/
    >
      <Container>
        <Text pt={8} fontSize={"sm"} textAlign={"center"} padding="15px">
          © 2023 Copyright. All rights reserved
        </Text>
      </Container>
    </Box>
  );
}
export default Footer;
