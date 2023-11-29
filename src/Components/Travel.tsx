import { Container, Title } from "@mantine/core";
import * as classes from "./Welcome.css";

import { USAMap } from "./USAMap";
import { WorldMap } from "./WorldMap";

// TODO: Consider adding USA national parks

export function Travel() {
  return (
    <Container>
      <Title className={classes.title} ta="center">
        Travel
      </Title>
      <WorldMap />
      <USAMap />
    </Container>
  );
}
