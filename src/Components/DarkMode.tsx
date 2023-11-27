import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./DarkMode.module.css";

function getIcon(computedColorScheme: "dark" | "light") {
  if (computedColorScheme === "light") {
    return <IconMoon className={cx(classes.icon)} stroke={1.5} />;
  } else {
    return <IconSun className={cx(classes.icon)} stroke={1.5} />;
  }
}
export function DarkModeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      {getIcon(computedColorScheme)}
    </ActionIcon>
  );
}
