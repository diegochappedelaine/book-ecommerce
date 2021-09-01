import { Book } from "global.d";

export const mergeBooksDuplicateAndAddQuantity = (array: Book[]) => {
  const newArray: (Book & { quantity: number })[] = [];

  array.forEach((item) => {
    const bookIndex = newArray.findIndex(
      (book: Book) => book.isbn === item.isbn
    );
    if (bookIndex === -1) {
      return newArray.push({ ...item, quantity: 1 });
    }
    newArray[bookIndex].quantity += 1;
  });

  return newArray;
};

export const returnPriceTotal = (card: Book[]) =>
  card.reduce(function (acc, book) {
    return acc + book.price;
  }, 0);
