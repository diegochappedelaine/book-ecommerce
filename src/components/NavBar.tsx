import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { BiShoppingBag } from "react-icons/bi";

interface NavBarProps {
  displayCard: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ displayCard }) => {
  return (
    <Box
      pos="fixed"
      maxW={"container.lg"}
      w="full"
      zIndex={2}
      background={"whiteAlpha.100"}
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            fontWeight="semibold"
          >
            Henri Potier's Library
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"red.400"}
            href={"#"}
            _hover={{
              bg: "red.300",
            }}
            onClick={displayCard}
          >
            <Icon as={BiShoppingBag} mr={2} /> Card
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default NavBar;
