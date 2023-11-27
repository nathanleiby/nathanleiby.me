import { ActionIcon, Container, Group, rem } from "@mantine/core";
import {
  IconBrandBandcamp,
  IconBrandGithub,
  IconBrandItch,
  IconBrandMedium,
  IconBrandSoundcloud,
  IconBrandStackoverflow,
  IconBrandYoutube,
  IconDotsVertical,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";

export function FooterSocial() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://github.com/nathanleiby"
            target="_blank"
          >
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://stackoverflow.com/users/950683/nate"
            target="_blank"
          >
            <IconBrandStackoverflow
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://medium.com/@nathanleiby"
            target="_blank"
          >
            <IconBrandMedium
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>

          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://nathanleiby.itch.io/"
            target="_blank"
          >
            <IconBrandItch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>

          <IconDotsVertical stroke={1.0} />

          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://nathanleiby.bandcamp.com/"
            target="_blank"
          >
            <IconBrandBandcamp
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://www.youtube.com/user/NotoriousNathaniel"
            target="_blank"
          >
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://soundcloud.com/natedogg"
            target="_blank"
          >
            <IconBrandSoundcloud
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
