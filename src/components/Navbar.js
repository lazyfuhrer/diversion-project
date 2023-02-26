import { Flex, IconButton, useColorMode, Icon, Input, InputGroup, InputRightElement, Spacer, Box, Button } from "@chakra-ui/react";
import { FiMoon, FiSun, FiSearch } from "react-icons/fi";
import { SearchIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { useIsMounted } from "utils/useIsMounted";
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

function Navbar() {
  const mounted = useIsMounted();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isConnected } = useAccount();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={colorMode === "light" ? "white" : "gray.800"}
      color={colorMode === "light" ? "gray.800" : "white"}
    >
      <Flex align="flex-start">
        <Link href="/">
          <Icon as={FiSearch} mr={4} cursor="pointer" />
        </Link>
        {mounted && isConnected && (
          <InputGroup w={{base: '200px', lg: "400px"}} maxW="400px">
            <Input placeholder='Search' />
            <InputRightElement children={<SearchIcon color='gray.500' />} />
          </InputGroup>
        )}
      </Flex>
      <Flex align="center">
        <Link as={NextLink} href='/Feed'>
          <Button bg='gray' variant="ghost" mx={{base: '0', sm: '20'}} _hover={{ color: "gray.500" }} color="white">Home</Button>
        </Link>
        <Link as={NextLink} href='/Upload'>
          <Button bg='gray' color={'white'} variant="ghost" _hover={{ color: "gray.500" }} >Upload</Button>
        </Link>
      </Flex>
      <Flex justify="flex-end" align="center" flex="1">
        <ConnectButton accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
        }} />
        <IconButton
          aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          size="md"
          ml={4}
        />
      </Flex>
    </Flex>
  );
}

export default Navbar;