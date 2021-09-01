import { Offer, DiscountedOffer, offersTypeEnum } from "global.d";

const getPriceWithRemovePercent = (price: number, value: number): number => {
  const discount = (value / 100) * price;

  return price - discount;
};

const getSlicedPrice = (
  price: number,
  sliceValue: number,
  discountPerSlice: number
): number => {
  const slicesAmount = Math.trunc(price / sliceValue);
  const discount = slicesAmount * discountPerSlice;

  return price - discount;
};

const applyDiscount = (offer: Offer, price: number): number => {
  switch (offer.type) {
    case offersTypeEnum.minus:
      return price - offer.value;

    case offersTypeEnum.percent:
      return getPriceWithRemovePercent(price, offer.value);

    case offersTypeEnum.slice:
      if (!offer.sliceValue) return price;
      return getSlicedPrice(price, offer.sliceValue, offer.value);
  }
};

export const getBestDiscount = (
  offers: Offer[],
  price: number
): DiscountedOffer => {
  const discountedOffers = offers.map((offer) => ({
    ...offer,
    price,
    discountedPrice: applyDiscount(offer, price),
  }));

  return discountedOffers.reduce(
    (acc, offer) =>
      (acc = acc.discountedPrice < offer.discountedPrice ? acc : offer)
  );
};

export const displayDiscount = (discountedOffer: DiscountedOffer): string => {
  switch (discountedOffer.type) {
    case offersTypeEnum.minus:
      return `Discount`;

    case offersTypeEnum.percent:
      return `Discount (- ${discountedOffer.value}%)`;

    case offersTypeEnum.slice:
      if (!discountedOffer.sliceValue) return `Discount`;
      return `Discount (€ ${discountedOffer.value} reduction every € ${discountedOffer.sliceValue})`;
  }
};
