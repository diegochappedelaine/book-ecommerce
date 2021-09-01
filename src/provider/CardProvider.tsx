import { useReducer, useContext, ReactNode, useEffect } from "react";
import CardContext, { ContextProps } from "./CardContext";
import { Book } from "global.d";

const initialState = {
  shoppingCard: [],
};

const reducer = (
  state: { shoppingCard: Book[] },
  action: { type: string; value: Book }
) => {
  switch (action.type) {
    case "add-book-to-card":
      return { ...state, shoppingCard: [...state.shoppingCard, action.value] };

    case "remove-book-from-card": {
      const shoppingCard = [...state.shoppingCard];
      const index = shoppingCard.findIndex((book) => {
        return book.isbn === action.value.isbn;
      });

      if (index !== -1) shoppingCard.splice(index, 1);
      return { ...state, shoppingCard };
    }

    default:
      throw new Error();
  }
};

const CardProvider = ({ children }: { children: ReactNode }) => {
  const STORAGE_KEY = "HENRI_POTIER_ESHOP";

  const [state, dispatch] = useReducer(reducer, initialState, (state) => {
    const localStorageCard = localStorage.getItem(STORAGE_KEY);
    const shoppingCard = localStorageCard ? JSON.parse(localStorageCard) : [];
    return { ...state, shoppingCard };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.shoppingCard));
  }, [state.shoppingCard]);

  const addBookToCard = (value: Book) => {
    dispatch({ type: "add-book-to-card", value });
  };

  const removeBookFromCard = (value: Book) => {
    dispatch({ type: "remove-book-from-card", value });
  };

  return (
    <CardContext.Provider
      value={{
        ...state,
        addBookToCard,
        removeBookFromCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

const useCardContext = () => {
  const context = useContext(CardContext) as ContextProps;
  if (context === undefined) {
    throw new Error("useCardContext must be used within an CardProvider");
  }
  return context;
};

export { useCardContext };

export default CardProvider;
