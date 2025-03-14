# Story 3: Add Photo Gallery to Bicycle Tour Page with Google Photos Integration

## Story

**As a** bicycle touring enthusiast\
**I want** to see photos from the bicycle route sourced from Google Photos\
**so that** I can get a visual sense of the journey and locations without duplicating image storage.

## Status

Draft

## Context

After implementing the map and route metrics, we need to add a photo gallery to provide visual context for the bicycle route. Instead of hosting images locally, we'll integrate with Google Photos to fetch images from a specific album. This approach offers several advantages: no need to duplicate image storage, ability to update photos without code changes, and leveraging Google's image optimization and CDN.

## Estimation

Story Points: 0.6 (approximately 6 minutes of AI development time)

## Acceptance Criteria

1. - [ ] Connect to Google Photos API to fetch images from a specific album
2. - [ ] Display photos in a responsive grid layout
3. - [ ] Show photo captions/descriptions from Google Photos metadata
4. - [ ] Implement proper image loading states and error handling
5. - [ ] Ensure responsive design for different screen sizes
6. - [ ] Maintain visual consistency with existing components
7. - [ ] Add fallback to sample images if API fails

## Subtasks

1. - [ ] Google Photos Integration
   1. - [ ] Set up Google Photos API credentials
   2. - [ ] Create API client for fetching album photos
   3. - [ ] Implement caching strategy to minimize API calls
   4. - [ ] Add error handling and fallback mechanism
2. - [ ] UI Components
   1. - [ ] Create PhotoGallery component
   2. - [ ] Design and implement grid layout
   3. - [ ] Add responsive styling
   4. - [ ] Implement image captions from Google Photos metadata
   5. - [ ] Add loading states and error handling UI
3. - [ ] Fallback Implementation
   1. - [ ] Create photo assets directory for fallback images
   2. - [ ] Add sample photos for the Tokyo route
   3. - [ ] Implement fallback logic when API fails
4. - [ ] Integration
   1. - [ ] Add PhotoGallery to BicycleTourPage
   2. - [ ] Ensure proper layout with existing components
5. - [ ] Testing
   1. - [ ] Write unit tests for PhotoGallery component
   2. - [ ] Test API integration with mocks
   3. - [ ] Test fallback mechanism
   4. - [ ] Test responsive behavior
   5. - [ ] Test loading and error states
6. - [ ] Documentation
   1. - [ ] Add component documentation
   2. - [ ] Document API setup process
   3. - [ ] Update README with photo gallery details

## Constraints

- Must maintain TypeScript type safety
- Must achieve minimum 80% test coverage
- Must handle API rate limits and errors gracefully
- UI must be responsive and match existing design system
- Must use Mantine components for consistency
- Must not expose API keys in client-side code

## Dev Notes

- Will use Google Photos API v1 for fetching album photos
- Need to create OAuth credentials in Google Cloud Console
- Will implement a simple proxy or use environment variables to protect API keys
- Will use Mantine's Image and SimpleGrid components for layout
- Consider implementing lazy loading for better performance
- May need to handle CORS issues with Google Photos API
- Will need to create a specific Google Photos album for the Tokyo route
- Consider implementing a caching mechanism to reduce API calls

## Progress Notes As Needed
