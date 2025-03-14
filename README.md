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

### Continuous Integration

This project uses GitHub Actions for continuous integration. The CI workflow runs automatically on every push to the master branch and pull requests, performing the following checks:

1. Linting - Checks code style and quality
2. Testing - Runs all unit tests with coverage reporting
3. Building - Verifies the project builds successfully
4. Bundle size analysis - Reports on the size of the generated bundles

CI artifacts (test coverage reports and build output) are available in the GitHub Actions workflow run.

## Deployment

This project can be manually deployed to GitHub Pages using either the provided script or directly through GitHub Actions.

### Option 1: Using the deployment script (recommended)

Run the deployment script with an optional message:

```bash
./deploy.sh "Your deployment message"
```

The script will:

1. Check if GitHub CLI is installed and authenticated
2. Trigger the deployment workflow with your message
3. Provide a link to monitor the deployment progress

### Option 2: Using GitHub Actions UI

To trigger a deployment through the GitHub UI:

1. Go to the GitHub repository
2. Navigate to the "Actions" tab
3. Select the "Manual Deploy to GitHub Pages" workflow
4. Click "Run workflow"
5. Enter a deployment message (optional)
6. Click "Run workflow" to start the deployment

### Option 3: Using GitHub CLI directly

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
