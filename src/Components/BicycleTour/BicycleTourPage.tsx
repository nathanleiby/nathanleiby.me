import { Container, Paper, Title } from "@mantine/core";
import { BicycleTourMap } from "./Map";

export const BicycleTourPage = () => {
  return (
    <Container size="xl">
      <Title order={1} mb="md">
        Bicycle Tours
      </Title>
      <Paper shadow="sm" p="md">
        <BicycleTourMap />
      </Paper>
    </Container>
  );
};
