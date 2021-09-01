import { useMemo, useEffect } from "react";
import { useFetchLazy } from "hooks";
import { useCardContext } from "provider/CardProvider";

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
  Text,
} from "@chakra-ui/react";
import ShoppingCardElementRow from "./ShoppingCardElementRow";
import ShoppingCardPriceSection from "./ShoppingCardPriceSection";

import { getBestDiscount } from "utils/handle-discount";
import {
  mergeBooksDuplicateAndAddQuantity,
  returnPriceTotal,
} from "utils/shopping-card";

import { Offer } from "global.d";

interface ShoppingCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({ isOpen, onClose }) => {
  const { shoppingCard } = useCardContext();

  const apiUrl = `${process.env.REACT_APP_API_URL}/books/${shoppingCard
    .map((book) => book.isbn)
    .join(",")}/commercialOffers`;

  const { fetchData, data } = useFetchLazy<{ offers: Offer[] }>(apiUrl);

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
          {!booksInCard.length && (
            <>
              <Text>
                Looks like your shopping bag is empty ! <br />
                <br />
                Start browsing now to acquire thoses mysterious books
              </Text>
              <Button onClick={onClose} mt={8}>
                Go back to website !
              </Button>
            </>
          )}
          {!!booksInCard.length && (
            <>
              <UnorderedList styleType="none" m={0}>
                {booksInCard.map((book, index) => (
                  <ShoppingCardElementRow book={book} key={index} />
                ))}
              </UnorderedList>
              <ShoppingCardPriceSection
                discountedOffer={discountedOffer}
                totalPrice={totalPrice}
              />
            </>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!booksInCard.length} w="full" colorScheme="blue">
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCard;
