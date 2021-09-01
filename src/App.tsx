import { useFetch } from "hooks";
import { Book } from "global.d";

import { useCardContext } from "provider/CardProvider";

function App() {
  const { data, loading } = useFetch<Book[]>(
    `${process.env.REACT_APP_API_URL}/books`
  );

  const { addBookToCard, shoppingCard, removeBookFromCard } = useCardContext();

  console.log(shoppingCard);

  return (
    <div>
      <h1>Hello Pottier</h1>
      <ul>
        {data?.map((book, index) => (
          <li key={index}>
            <p>{book.title}</p>
            <button onClick={() => addBookToCard(book)}>Add</button>
            <button onClick={() => removeBookFromCard(book)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
