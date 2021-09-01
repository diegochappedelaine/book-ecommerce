import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { RiShoppingCartLine } from "react-icons/ri";

import { Book } from "global.d";
import { useCardContext } from "provider/CardProvider";

const ProductAddToCart: React.FC<{ book: Book }> = ({ book }) => {
  const { addBookToCard } = useCardContext();

  return (
    <Box
      as="li"
      bg={useColorModeValue("white", "gray.800")}
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      mb={14}
    >
      <Image
        src={book.cover}
        alt={`Cover of ${book.title}`}
        roundedTop="lg"
        width="full"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            New
          </Badge>
        </Box>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight">
            {book.title}
          </Box>
          <Tooltip
            label="Add to cart"
            bg="white"
            placement={"top"}
            color={"gray.800"}
            fontSize={"1.2em"}
          >
            <Button colorScheme="blue" onClick={() => addBookToCard(book)}>
              <Icon as={RiShoppingCartLine} h={7} w={7} alignSelf={"center"} />
            </Button>
          </Tooltip>
        </Flex>

        <Flex justifyContent="space-between" alignContent="center">
          <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
            <Box as="span" color={"gray.600"} fontSize="lg">
              {book.price.toFixed(2)}€
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductAddToCart;
