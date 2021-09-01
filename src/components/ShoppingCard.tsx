import { useMemo } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  UnorderedList,
  ListItem,
  Text,
  Tag,
} from "@chakra-ui/react";
import { useCardContext } from "provider/CardProvider";

import { mergeBooksDuplicateAndAddQuantity } from "utils/shopping-card";

import { Book } from "global.d";

interface ShoppingCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({ isOpen, onClose }) => {
  const { shoppingCard, addBookToCard, removeBookFromCard } = useCardContext();

  const booksInCard = useMemo(
    () => mergeBooksDuplicateAndAddQuantity(shoppingCard),
    [shoppingCard]
  );

  return (
    <Drawer size="lg" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Shopping bag</DrawerHeader>

        <DrawerBody>
          <UnorderedList styleType="none" m={0}>
            {booksInCard?.map((book) => (
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
                <Tag colorScheme="red" mr={2}>
                  {book.quantity > 1 && `x${book.quantity}`}
                </Tag>
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
                <Text>€ {book.price * book.quantity}</Text>
              </ListItem>
            ))}
          </UnorderedList>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCard;
