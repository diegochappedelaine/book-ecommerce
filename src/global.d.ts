export interface Book {
  isbn: string;
  title: string;
  price: number;
  cover: string;
  synopsis: string[];
}

export interface BookInCard extends Book {
  quantity: number;
}

export enum offersTypeEnum {
  percent = "percentage",
  minus = "minus",
  slice = "slice",
}

export interface Offer {
  type: offersTypeEnum;
  value: number;
  sliceValue?: number;
}

export interface DiscountedOffer extends Offer {
  discountedPrice: number;
  price: number;
}
