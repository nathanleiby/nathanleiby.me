import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Router } from "wouter";
import { About } from "./Components/About";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Projects } from "./Components/Projects";
import { Travel } from "./Components/Travel";
import { Welcome } from "./Components/Welcome";
import { Writing } from "./Components/Writing";
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
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/travel">
          <Travel />
        </Route>
        <Route path="/writing">
          <Writing />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route
          path="/meet"
          component={() => {
            window.location.href =
              "https://calendar.app.google/twDK6AktDZqiqq159";
            return null;
          }}
        />
        <Footer />
      </MantineProvider>
    </Router>
  );
}
