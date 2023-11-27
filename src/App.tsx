import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Router } from "wouter";
import { FooterSocial } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Welcome } from "./Components/Welcome";
import { useHashLocation } from "./hash_routing";
import { theme } from "./theme";

export default function App() {
  return (
    <Router hook={useHashLocation} base="/">
      <MantineProvider theme={theme}>
        <Header />
        <Route path="/">
          <Welcome />
        </Route>
        <Route path="/projects">Projects</Route>
        <Route path="/travel">Travel</Route>
        <Route path="/writing">Writing</Route>
        <Route path="/about">About</Route>
        <FooterSocial />
      </MantineProvider>
    </Router>
  );
}
