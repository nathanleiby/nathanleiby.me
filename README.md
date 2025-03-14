# Personal website

## Features

### Bicycle Touring

The website includes an interactive bicycle touring section that displays routes and their metrics. Key features include:

- Interactive map using Leaflet and OpenStreetMap
- Route visualization with polylines
- Detailed route metrics:
  - Distance calculation using the Haversine formula
  - Estimated duration based on average cycling speed (20 km/h)
  - Elevation gain tracking
  - Start and end point display
- Responsive design that works on both desktop and mobile devices

## Development

Run locally with

```bash
npm run dev
```

Run linting manually with

```bash
npm run lint
```

Run tests with coverage report

```bash
npm run test:coverage
```

## Deployment

Preview the production build with

```bash
npm run preview
```

Deploy latest to gh pages with

```bash
npm run predeploy && npm run deploy
```

## Technical Details

### Route Metrics Calculation

The application calculates route metrics using the following methods:

- **Distance**: Uses the Haversine formula to calculate accurate distances between GPS coordinates
- **Duration**: Estimates based on an average cycling speed of 20 km/h
- **Elevation**: Tracks cumulative elevation gain along the route
- **Route Points**: Stores named locations for start/end point display

The metrics are displayed in a clean card layout using Mantine UI components and Tabler icons.
