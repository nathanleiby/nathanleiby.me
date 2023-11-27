import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

import { MantineColorsTuple } from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#fff4e2",
  "#ffe9cc",
  "#ffd09c",
  "#fdb766",
  "#fca13a",
  "#fb931d",
  "#fc8c0c",
  "#e17900",
  "#c86a00",
  "#ae5a00",
];

export const theme = createTheme({
  colors: {
    myColor,
  },
});

export const vars = themeToVars(theme);
