import { useFetch } from "hooks";
import { Book } from "global.d";

function App() {
  const { data, loading } = useFetch<Book[]>(
    `${process.env.REACT_APP_API_URL}/books`
  );

  console.log(data);
  return (
    <div>
      <h1>Hello Pottier</h1>
      <ul>
        {data?.map((book, index) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
