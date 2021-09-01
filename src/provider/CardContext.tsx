import { createContext } from "react";
import { Book } from "global.d";

export type ContextProps = {
  shoppingCard: Book[];
  addBookToCard: (book: Book) => void;
  removeBookFromCard: (book: Book) => void;
};

const CardContext = createContext<Partial<ContextProps>>({});

export default CardContext;
