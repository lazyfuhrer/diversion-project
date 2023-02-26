// import {Box, Button, ChakraProvider, Container, Heading, Text, extendTheme, Stack} from "@chakra-ui/react";
// import Image from 'next/image'
// import "fontsource-aileron"

// const theme=extendTheme({
//   fonts: {
//     heading: 'Aileron',
//     body: 'Inter',
//   },
//   colors: {
//     brand: {
//       50: '#f5f5f5',
//       100: '#e5e5e5',
//       200: '#c5c5c5',
//       300: '#a5a5a5',
//       400: '#858585',
//       500: '#666666',
//       600: '#4d4d4d',
//       700: '#333333',
//       800: '#1a1a1a',

//       900: '#000000',
//     },
//   },
// });

// export default function Home() {
//   return (
//     <ChakraProvider theme={theme} >

//       <Box bg="brand.800" color="white" minH="100vh" w='100%'
//   h='200px'>
//         <Container maxW="container.xl">
//           <Box display="flex" flexDirection="column" alignItems="center" py={16}>
//             <Heading as="h1" size="2xl" fontWeight="extrabold" textAlign="left" bgGradient="linear(to-r, #1F8A70, green.500)"
//   bgClip="text"
//   fontSize="6xl">
//               WATCHPARTY
//             </Heading>
//             <Text fontSize="2xl" my={8} textAlign="center">
//               Empowering creators, Decentralized and Uninterrupted
//             </Text>
//             <Button colorScheme="brand" size="lg">
//               Get started
//             </Button>
//             </Box>

//         </Container>
//         <div className="grid-element">
//     <Image
//       src="/example.png"
//       fill
//       sizes="(max-width: 768px) 100vw,
//               (max-width: 1200px) 50vw,
//               33vw"
//     />
//   </div>
//       </Box>

//     </ChakraProvider>
//   );
// }
import Landing from "./Landing";
import Head from "next/head";
import Footer from "../components/Footer"

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Landing/>
      
    </>
  );
}


