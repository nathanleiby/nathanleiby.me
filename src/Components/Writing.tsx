import { Container, List, ListItem, Title } from "@mantine/core";
import * as classes from "./Welcome.css";

export function Writing() {
  return (
    <Container>
      <Title className={classes.title} mb="lg">
        Writing
      </Title>
      <List>
        <ListItem>
        <a href="https://engineering.clever.com/author/nleiby/" target="_">
        Clever
        </a> - Writings on devops and infrastructure. We scaled Clever to support over 50% of US schools and 10M+ daily active users.
        </ListItem>
        <ListItem>
        <a href="https://nathanleiby.bearblog.dev/blog/" target="_">
        Recurse Center
        </a> - My reflections on a 6-week programming retreat. I built a Nintendo emulator, among other things.
        </ListItem>
      </List>
    </Container>
  );
}
