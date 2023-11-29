import { Container, Title } from "@mantine/core";
import * as classes from "./Welcome.css";

export function Welcome() {
  return (
    <Container>
      <Title className={classes.title} ta={"center"}>
        Welcome
      </Title>
    </Container>
  );
}
