import { Burger, Container, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from "@mantinex/mantine-logo";
import { Link, useLocation } from "wouter";
import { DarkModeToggle } from "./DarkMode";
import classes from "./Header.module.css";

const links = [
  { link: "/projects", label: "Projects" },
  { link: "/travel", label: "Travel" },
  { link: "/writing", label: "Writing" },
  { link: "/about", label: "About" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [location] = useLocation();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={location === link.link ? true : undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Link to="/">
          <Text
            variant="gradient"
            component="span"
            gradient={{ from: "pink", to: "yellow" }}
            size="xl"
          >
            Nathan Leiby
          </Text>
        </Link>
        <Group>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>
          <DarkModeToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        {/* TODO: add menu for <sm view */}
      </Container>
    </header>
  );
}
