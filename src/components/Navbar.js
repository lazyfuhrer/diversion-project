import {
  Flex, IconButton, useColorMode, Icon, Input, InputGroup, InputRightElement, Spacer, Box, Button, Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import React from "react"
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();


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
      <Button ref={btnRef} colorScheme='blue' onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Link as={NextLink} href='/'>
              <Button margin="20px 0px" ref={btnRef} colorScheme='blue' onClick={onClose}>
                Home
              </Button></Link>
            <Link as={NextLink} href='/Upload'>
              <Button margin="20px 0px" ref={btnRef} colorScheme='blue' onClick={onClose}>
                Upload
              </Button></Link>
            <Link as={NextLink} href='/Feed'>
              <Button margin="20px 0px" ref={btnRef} colorScheme='blue' onClick={onClose}>
                Feed
              </Button></Link>
            <Link as={NextLink} href='/About'>
              <Button margin="20px 0px" ref={btnRef} colorScheme='blue' onClick={onClose}>
                About us
              </Button></Link>
          </DrawerBody>

        </DrawerContent>
      </Drawer>


      <Flex align="flex-start">
        <Link href="/">
          <Icon as={FiSearch} mr={4} cursor="pointer" />
        </Link>
        {mounted && isConnected && (
          <InputGroup w={{ base: '200px', lg: "400px" }} maxW="400px">
            <Input placeholder='Search' />
            <InputRightElement children={<SearchIcon color='gray.500' />} />
          </InputGroup>
        )}
      </Flex>



      <Flex align="center">


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