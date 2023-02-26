import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
  } from "@chakra-ui/react";
   
 
function Landing() {
  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        // py={{ base: 20, md: 36 }}
        paddingTop='65px'
        paddingBottom='60px'
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Monetizing Your Content{" "}
          <Text
            as={"span"}
            color={"#0A14D6"}
            backgroundImage="linear-gradient(to bottom right,#09c6f9,#0a14d6)"
            backgroundClip="text"
            textFillColor="transparent"
          >
            Like Never Before!
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Monetize your content by charging your most loyal viewers
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            colorScheme={"green"}
            bg={"green.400"}
            rounded={"full"}
            px={6}
            backgroundImage="linear-gradient(to bottom,#09c6f9,#0A14D6)"
            _hover={{
              bg: "#09c6f9",
            }}
          >
            Get Started
          </Button>
          <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
            Learn more
          </Button>
          <Box>
            
            
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Landing;
