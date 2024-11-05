import { Container, Text, Title } from "@mantine/core";
import * as classes from "./Welcome.css";

export function Writing() {
  return (
    <Container>
      <Title className={classes.title} mb="lg">
        Writing
      </Title>
      <Text>
        I am blogging about my experiences in Recurse Center,{" "}
        <a href="https://nathanleiby.bearblog.dev/blog/" target="_">
          here
        </a>
        .
      </Text>
    </Container>
  );
}
