import { useFetch } from "hooks";
import { Book } from "global.d";

import { NavBar, BookCard, BookListContainer } from "components";
import { Container } from "@chakra-ui/react";

const HomePage = () => {
  const { data } = useFetch<Book[]>(`${process.env.REACT_APP_API_URL}/books`);

  return (
    <Container maxW="container.lg">
      <NavBar />
      <BookListContainer>
        {data?.map((book, index) => (
          <BookCard book={book} key={index} />
        ))}
      </BookListContainer>
    </Container>
  );
};

export default HomePage;
