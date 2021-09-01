import { Container, Heading, Stack, Text } from "@chakra-ui/react";

const HeadingSection = () => {
  return (
    <Container as="section" maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          as="h1"
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          mt={"60px"}
        >
          <Text as={"span"} color={"red.500"}>
            Henri Potier's
          </Text>{" "}
          library
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"} lineHeight="7">
          Harry Potter is a series of seven fantasy novels written by British
          author J. K. Rowling. <br />
          The novels chronicle the lives of a young wizard, Harry Potter, and
          his friends Hermione Granger and Ron Weasley, all of whom are students
          at Hogwarts School of Witchcraft and Wizardry. <br />
          <br />
          The publisher of the fabulous Henri Potier's saga presents to you a
          new wonderful and magical Edition.
        </Text>
      </Stack>
    </Container>
  );
};

export default HeadingSection;
