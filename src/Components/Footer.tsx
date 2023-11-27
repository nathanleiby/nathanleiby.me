import { ActionIcon, Container, Group, rem } from "@mantine/core";
import {
  IconBook,
  IconBrandBandcamp,
  IconBrandGithub,
  IconBrandItch,
  IconBrandMedium,
  IconBrandSoundcloud,
  IconBrandStackoverflow,
  IconBrandYoutube,
  IconMinusVertical,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";

const group1 = [
  {
    href: "https://github.com/nathanleiby",
    Icon: IconBrandGithub,
  },
  {
    href: "https://nathanleiby.itch.io/",
    Icon: IconBrandItch,
  },
  {
    href: "https://stackoverflow.com/users/950683/nate",
    Icon: IconBrandStackoverflow,
  },
  {
    href: "https://medium.com/@nathanleiby",
    Icon: IconBrandMedium,
  },
];

const group2 = [
  { href: "https://www.goodreads.com/user/show/30810164", Icon: IconBook },
  { href: "https://nathanleiby.bandcamp.com/", Icon: IconBrandBandcamp },
  {
    href: "https://www.youtube.com/user/NotoriousNathaniel",
    Icon: IconBrandYoutube,
  },
  { href: "https://soundcloud.com/natedogg", Icon: IconBrandSoundcloud },
];

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          {group1.map(({ href, Icon }) => (
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href={href}
              target="_blank"
            >
              <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          ))}

          <IconMinusVertical stroke={1.0} />

          {group2.map(({ href, Icon }) => (
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href={href}
              target="_blank"
            >
              <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          ))}
        </Group>
      </Container>
    </div>
  );
}
