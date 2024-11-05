import { Container, Text, Title } from "@mantine/core";
import * as classes from "./Welcome.css";

export function About() {
  return (
    <Container>
      <Title className={classes.title} mb={"lg"}>
        About
      </Title>
      <Text>
        The best way to reach me is email:{" "}
        <a href="mailto:nathanleiby@gmail.com">nathanleiby@gmail.com</a>
      </Text>
      <Text mt="xl">
        Schedule a{" "}
        <a href="https://calendar.app.google/twDK6AktDZqiqq159" target="_">
          meeting
        </a>{" "}
        with me.
      </Text>
      <Text mt="xl">
        See my{" "}
        <a
          href="https://gist.github.com/nathanleiby/8bf2cea81d46a81fa5db7e01cf009943"
          target="_"
        >
          resume
        </a>
        .
      </Text>
    </Container>
  );
}
