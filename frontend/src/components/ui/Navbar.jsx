import { Button, Container, Flex, HStack, Text,Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import { FaPlus } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import { useColorMode, useColorModeValue } from './color-mode';

import { IoMdSunny } from "react-icons/io";
import { FaCloudMoon } from "react-icons/fa";



const Navbar = () => {

  const { colorMode, toggleColorMode } = useColorMode()
  return <Container maxW={"1140px"} px={4} bg={useColorModeValue ("gray.800", "gray.600")}   borderRadius={"md"}>

    <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}
    >

        <Text
            fontSize={{base: "22px", sm: "32px", md: "22px"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-l, #7929CA, #FF0080)"}
            bgClip={"text"}
            color={"white"}
            display="flex"
            alignItems="center"
            
        >
            <Box as={IoStorefrontOutline} size="1.5em" mr={2} /> {/* Icon */}
            <Link to={"/"}>Product Store </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
            <Button>
                <FaPlus fontSize={20}/>
            </Button>
            </Link>

            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FaCloudMoon /> : <IoMdSunny />}
            </Button>

        </HStack>
    </Flex>

  </Container>
}

export default Navbar