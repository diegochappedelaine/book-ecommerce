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
  Flex,
} from "@chakra-ui/react";
import { useCardContext } from "provider/CardProvider";

import {
  mergeBooksDuplicateAndAddQuantity,
  returnPriceTotal,
} from "utils/shopping-card";

import { Book, Offer } from "global.d";
import { useEffect } from "react";
import { useFetchLazy } from "hooks";
import { getBestDiscount, displayDiscount } from "utils/handle-discount";

interface ShoppingCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({ isOpen, onClose }) => {
  const { shoppingCard, addBookToCard, removeBookFromCard } = useCardContext();

  const { fetchData, data } = useFetchLazy<{ offers: Offer[] }>(
    `${process.env.REACT_APP_API_URL}/books/${shoppingCard
      .map((book) => book.isbn)
      .join(",")}/commercialOffers`
  );

  const booksInCard = useMemo(
    () => mergeBooksDuplicateAndAddQuantity(shoppingCard),
    [shoppingCard]
  );

  const totalPrice = useMemo(
    () => returnPriceTotal(shoppingCard),
    [shoppingCard]
  );

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const discountedOffer = data && getBestDiscount(data.offers, totalPrice);

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
            ))}
          </UnorderedList>
          {shoppingCard.length > 0 && (
            <>
              <Flex mb={4} justifyContent="space-between">
                <Text>Subtotal</Text>
                <Text>€ {totalPrice}</Text>
              </Flex>
              {discountedOffer && (
                <Flex mb={4} color="red" justifyContent="space-between">
                  <Text>{displayDiscount(discountedOffer)}</Text>
                  <Text>
                    - €{" "}
                    {discountedOffer.price - discountedOffer.discountedPrice}
                  </Text>
                </Flex>
              )}
              <Flex mb={4} justifyContent="space-between">
                <Text>Total</Text>
                <Text>€ {discountedOffer?.discountedPrice || totalPrice}</Text>
              </Flex>
            </>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button w="full" colorScheme="blue">
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCard;
