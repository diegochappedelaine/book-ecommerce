import { UnorderedList } from "@chakra-ui/react";

const BookListContainer: React.FC = ({ children }) => {
  return (
    <UnorderedList
      p={0}
      m={0}
      mt={12}
      w="full"
      wrap="wrap"
      styleType="none"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {children}
    </UnorderedList>
  );
};

export default BookListContainer;
