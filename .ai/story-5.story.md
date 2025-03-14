# Story 5: Implement Real GPX Data for East Hokkaido Tour

## Story

**As a** bicycle touring enthusiast\
**I want** to see actual GPX data from my East Hokkaido tour displayed on the map\
**so that** I can share an authentic representation of my real-world bicycle journey.

## Status

Complete

## Context

After implementing the basic bicycle touring section with sample GPX files, we needed to enhance the experience by using actual GPX data from the East Hokkaido tour. The real GPX files contain more detailed and accurate track information, including coordinates, elevation, and timestamps from the actual journey. This implementation provides a more authentic representation of the bicycle tour and demonstrates the application's ability to handle real-world GPX data.

## Estimation

Story Points: 0.3 (approximately 3 minutes of AI development time)

## Acceptance Criteria

1. - [x] Replace sample GPX files with actual East Hokkaido tour GPX files
2. - [x] Ensure the map displays the complete East Hokkaido tour route accurately
3. - [x] Optimize performance for handling large GPX files
4. - [x] Maintain responsive design and user experience

## Subtasks

1. - [x] GPX File Integration

   1. - [x] Copy actual GPX files from data directory to public directory
   2. - [x] Update file paths in BicycleTourPage component
   3. - [x] Update day names to match actual route segments

2. - [x] Performance Optimization

   1. - [x] Enhance downsampling for large GPX files
   2. - [x] Add additional downsampling when combining multiple day routes
   3. - [x] Add logging to track parsing and downsampling process

3. - [x] Testing
   1. - [x] Test loading and displaying actual GPX files
   2. - [x] Verify performance with large datasets

## Constraints

- Must maintain TypeScript type safety
- Must handle large GPX files efficiently
- UI must remain responsive and match existing design system

## Dev Notes

- The actual GPX files are significantly larger than the sample files (several MB each)
- Implemented more aggressive downsampling for very large files (>10,000 points)
- Added additional downsampling when combining multiple day routes to maintain performance

## Progress Notes As Needed

### 2024-06-04

- Identified actual GPX files in the data/gpx/east-hokkaido directory
- Updated the East Hokkaido Tour configuration in BicycleTourPage.tsx to use the actual GPX files
- Enhanced the gpxParser utility to handle large GPX files more efficiently:
  - Added more aggressive downsampling for very large GPX files (>10,000 points)
  - Added additional downsampling when combining multiple day routes
  - Added logging to track the parsing and downsampling process
- Copied the actual GPX files from the data directory to the public directory
- Updated file paths in the BicycleTourPage component
- Updated day names to match the actual route segments:
  1. Lake Kussharo to Lake Akan
  2. Lake Akan to Kushiro
  3. Nakashibetsu to Lake Kussharo
  4. Rausu to Nakashibetsu
  5. Shari to Utoro (Shiretoko Park)
  6. Utoro to Rausu (East Shiretoko)
- Tested the application to ensure the actual GPX files load and display correctly
- Committed and pushed changes to the repository
