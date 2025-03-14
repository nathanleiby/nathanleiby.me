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
- Photo gallery:
  - Responsive grid layout
  - Photo captions
  - Optimized image loading
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

This project can be manually deployed to GitHub Pages using the GitHub Actions workflow.

To trigger a deployment:

1. Go to the GitHub repository
2. Navigate to the "Actions" tab
3. Select the "Manual Deploy to GitHub Pages" workflow
4. Click "Run workflow"
5. Enter a deployment message (optional)
6. Click "Run workflow" to start the deployment

Alternatively, you can use the GitHub CLI to trigger the deployment:

```bash
gh workflow run manual-deploy.yml -f deploy_message="Your deployment message"
```

The deployment process will:

1. Build the project using Vite
2. Upload the build artifacts
3. Deploy to GitHub Pages
4. Provide a URL to the deployed site when complete

## Technical Details

### Route Metrics Calculation

The application calculates route metrics using the following methods:

- **Distance**: Uses the Haversine formula to calculate accurate distances between GPS coordinates
- **Duration**: Estimates based on an average cycling speed of 20 km/h
- **Elevation**: Tracks cumulative elevation gain along the route
- **Route Points**: Stores named locations for start/end point display

The metrics are displayed in a clean card layout using Mantine UI components and Tabler icons.

### Photo Gallery

The photo gallery component provides a visual representation of the bicycle route:

- **Responsive Grid**: Automatically adjusts columns based on screen size
- **Image Optimization**: Uses optimized images with proper loading states
- **Captions**: Displays descriptive captions for each photo
- **Fallback Handling**: Provides fallback images if the main images fail to load
