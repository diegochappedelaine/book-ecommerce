import { useFetch } from "hooks";
import { Book } from "global.d";

import {
  NavBar,
  BookCard,
  BookListContainer,
  Heading,
  Loading,
  ShoppingCard,
} from "components";
import { Container, useDisclosure } from "@chakra-ui/react";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, loading } = useFetch<Book[]>(
    `${process.env.REACT_APP_API_URL}/books`
  );

  return (
    <Container maxW="container.lg">
      <ShoppingCard isOpen={isOpen} onClose={onClose} />
      <NavBar displayCard={onOpen} />
      <Heading />
      <BookListContainer>
        {loading && <Loading />}
        {data?.map((book, index) => (
          <BookCard book={book} key={index} />
        ))}
      </BookListContainer>
    </Container>
  );
};

export default HomePage;
