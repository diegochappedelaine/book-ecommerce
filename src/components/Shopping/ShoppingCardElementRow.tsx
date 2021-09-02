import { useCardContext } from "provider/CardProvider";

import {
  Button,
  ListItem,
  Text,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";

import { BookInCard, Book } from "global.d";

interface ShoppingCardElementRowProps {
  book: BookInCard;
}

const handleButtonClick = (
  book: BookInCard,
  handleBook: (book: Book) => void
): void => {
  const bookToUpdate = {
    ...book,
  } as Book & { quantity?: number };
  delete bookToUpdate.quantity;

  return handleBook(bookToUpdate);
};

const ShoppingCardElementRow: React.FC<ShoppingCardElementRowProps> = ({
  book,
}) => {
  const { addBookToCard, removeBookFromCard } = useCardContext();

  return (
    <ListItem
      bg={useColorModeValue("gray.200", "gray.800")}
      p={2}
      borderRadius={10}
      display="flex"
      alignItems="center"
      w="full"
      mb={3}
    >
      <Text mr={2} isTruncated>
        {book.title}
      </Text>
      {book.quantity > 1 && (
        <Tag colorScheme="red" mr={2}>
          {`x${book.quantity}`}
        </Tag>
      )}
      <Button
        ml="auto"
        size="sm"
        onClick={() => handleButtonClick(book, removeBookFromCard)}
        mr={2}
      >
        -
      </Button>
      <Button
        size="sm"
        onClick={() => handleButtonClick(book, addBookToCard)}
        mr={2}
      >
        +
      </Button>
      <Text w={14} textAlign="end" whiteSpace="nowrap">
        € {book.price * book.quantity}
      </Text>
    </ListItem>
  );
};

export default ShoppingCardElementRow;
