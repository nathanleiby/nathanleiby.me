import { Title } from "@mantine/core";
import * as classes from "./Welcome.css";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center">
        Welcome
      </Title>
    </>
  );
}
