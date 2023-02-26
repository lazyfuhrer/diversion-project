import {
  Center, Text, Box, Image, Container
} from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import Link from "next/link"
function About() {
  const team = [
    {
      name: "Ankur Sarkar",
      image: "https://avatars.githubusercontent.com/u/78259188?v=4",
      github: "https://github.com/Ankur02Sarkar",
      linkedin: "https://www.linkedin.com/in/ankur-sarkar/"
    }, {
      name: "Biswarghya Biswas",
      image: "https://avatars.githubusercontent.com/u/64888892?v=4",
      github: "https://github.com/lazyfuhrer",
      linkedin: "https://www.linkedin.com/in/biswarghya-biswas/"
    }, {
      name: "Aharna Haque",
      image: "https://avatars.githubusercontent.com/u/91414975?v=4",
      github: "https://github.com/aharna",
      linkedin: "https://www.linkedin.com/in/aharna-haque-b44832219/"
    }, {
      name: "Vimal",
      image: "https://media.licdn.com/dms/image/D4D03AQER0xtSvSWXDg/profile-displayphoto-shrink_800_800/0/1670436639887?e=1683158400&v=beta&t=Pw2zC8ZCQubR-KHTp4SxYYIG1sgPc6BfkAmBXtib9jc",
      github: "https://github.com/Vimal2023",
      linkedin: "https://www.linkedin.com/in/vimal-anand-9917a1212/"
    },
  ]
  return (
    <Container maxWidth="fit-content">
      <Center >
        <Text >Meet the Team</Text>
      </Center>
      <Box display="flex" flexDirection="row" m="10px" gap="20px">
        {team.map((person, index) => (
          <Center flexDirection="column" gap="7px">
            <Image borderRadius="23px" src={person.image} alt="Name" />
            <Text>{person.name}</Text>
            <Center gap="10px">
              <Link href={person.github}>
                <BsGithub size={37} />
              </Link>
              <Link href={person.linkedin}>
                <BsLinkedin size={37} />
              </Link>
            </Center>
          </Center>
        ))}
      </Box>
    </Container>
  );
}

export default About;
