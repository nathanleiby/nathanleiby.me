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
        with me. If you're in San Francisco, I'm glad to meet up in person.
      </Text>
      <Text mt="xl">
        See my{" "}
        <a
          href="https://resume.nathanleiby.me"
          target="_"
        >
          resume
        </a>
        .
      </Text>
    </Container>
  );
}
