import { useCardContext } from "provider/CardProvider";

import { Button, ListItem, Text, Tag } from "@chakra-ui/react";

import { BookInCard, Book } from "global.d";

interface ShoppingCardElementRowProps {
  book: BookInCard;
}

const ShoppingCardElementRow: React.FC<ShoppingCardElementRowProps> = ({
  book,
}) => {
  const { addBookToCard, removeBookFromCard } = useCardContext();

  return (
    <ListItem
      bg={"gray.200"}
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
        onClick={() => {
          const bookToRemove: Book & { quantity?: number } = {
            ...book,
          };
          delete bookToRemove.quantity;
          removeBookFromCard(bookToRemove);
        }}
        mr={2}
      >
        -
      </Button>
      <Button
        size="sm"
        onClick={() => {
          const bookToAdd: Book & { quantity?: number } = { ...book };
          delete bookToAdd.quantity;
          addBookToCard(bookToAdd);
        }}
        mr={2}
      >
        +
      </Button>
      <Text whiteSpace="nowrap">€ {book.price * book.quantity}</Text>
    </ListItem>
  );
};

export default ShoppingCardElementRow;
