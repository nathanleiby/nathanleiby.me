import { Container, Text, Title } from "@mantine/core";
import * as classes from "./Welcome.css";

export function About() {
  return (
    <Container>
      <Title className={classes.title} ta="center">
        About
      </Title>
      <Text mt="xl" ta="center">
        The best way to reach me is email:{" "}
        <a href="mailto:nathanleiby@gmail.com">nathanleiby@gmail.com</a>
      </Text>
      <Text mt="xl" ta="center">
        My resume can be found{" "}
        <a
          href="https://gist.github.com/nathanleiby/8bf2cea81d46a81fa5db7e01cf009943"
          target="_"
        >
          here
        </a>
        .
      </Text>
    </Container>
  );
}
