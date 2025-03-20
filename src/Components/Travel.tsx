import { Container, Title } from "@mantine/core";
import * as classes from "./Welcome.css";

import NationalParksUSAMap from "./NationalParksUSAMap";
import { USAMap } from "./USAMap";
import WorldMap from "./WorldMap";

// TODO: Consider adding a "hiking" or "outdoors" section to highlight where I've backpacked, kayaked tour'd, etc. Could focus on CA and Western USA

export function Travel() {
  return (
    <Container>
      <Title className={classes.title} mb="lg">
        Travel
      </Title>
      <Title size={"sm"}>World</Title>
      <WorldMap />
      <Title size={"sm"}>United States</Title>
      <USAMap />
      <Title size={"sm"}>United States National Parks</Title>
      <NationalParksUSAMap />
    </Container>
  );
}
