import { Text, Flex } from "@chakra-ui/react";

import { DiscountedOffer } from "global.d";

import { displayDiscount } from "utils/handle-discount";

interface ShoppingCardPriceSectionProps {
  discountedOffer: DiscountedOffer | undefined;
  totalPrice: number;
}

const ShoppingCardPriceSection: React.FC<ShoppingCardPriceSectionProps> = ({
  discountedOffer,
  totalPrice,
}) => {
  return (
    <>
      <Flex mb={4} justifyContent="space-between">
        <Text>Subtotal</Text>
        <Text>€ {totalPrice}</Text>
      </Flex>
      {discountedOffer && (
        <Flex mb={4} color="red" justifyContent="space-between">
          <Text>{displayDiscount(discountedOffer)}</Text>
          <Text>
            - € {discountedOffer.price - discountedOffer.discountedPrice}
          </Text>
        </Flex>
      )}
      <Flex mb={4} justifyContent="space-between">
        <Text>Total</Text>
        <Text>€ {discountedOffer?.discountedPrice || totalPrice}</Text>
      </Flex>
    </>
  );
};

export default ShoppingCardPriceSection;
