# Google Photos Integration for Bicycle Tour Gallery

## Overview

This document outlines the approach for integrating Google Photos into the bicycle touring section of nathanleiby.me. Instead of hosting images locally in the repository, we'll fetch them from specific Google Photos albums, allowing for easier management of photo content without code changes.

## Benefits

1. **Content Management**: Update photos without code changes or repository updates
2. **Storage Efficiency**: No need to duplicate image storage in the repository
3. **Image Optimization**: Leverage Google's built-in image optimization and CDN
4. **Bandwidth**: Reduce repository size and bandwidth usage
5. **Metadata**: Access rich metadata like location, timestamps, and descriptions

## Technical Requirements

### Google Cloud Setup

1. **Google Cloud Project**:

   - Create a new project in Google Cloud Console
   - Enable the Google Photos Library API
   - Set up OAuth 2.0 credentials
   - Configure authorized domains and redirect URIs

2. **API Credentials**:
   - Create OAuth client ID and client secret
   - Store credentials securely (not in client-side code)
   - Set up proper scopes for read-only access to albums

### Implementation Approach

#### Option 1: Backend Proxy (Recommended)

To avoid exposing API credentials in client-side code, we'll implement a simple backend proxy:

1. **Serverless Function**:

   - Create a serverless function (e.g., Netlify Function, Vercel Serverless)
   - Function will handle authentication with Google Photos API
   - Client will call this function instead of directly accessing Google Photos API

2. **Authentication Flow**:

   - Backend stores OAuth credentials securely
   - Backend handles token refresh and management
   - Client makes authenticated requests through the proxy

3. **Caching Strategy**:
   - Implement caching at the proxy level
   - Cache album data to reduce API calls
   - Set appropriate cache expiration

#### Option 2: Client-Side Integration with Environment Variables

If a backend proxy is not feasible:

1. **Environment Variables**:

   - Store API key in environment variables
   - Use build-time environment variables to avoid exposing in client code
   - Implement proper CORS configuration

2. **Direct API Calls**:
   - Client directly calls Google Photos API
   - Implement proper error handling and rate limiting
   - Use session storage for temporary caching

### Album Management

1. **Album Structure**:

   - Create specific albums for each bicycle route
   - Use album titles that match route names
   - Add descriptions to albums for additional metadata

2. **Photo Requirements**:
   - Add captions to photos for display in the gallery
   - Ensure photos have location data when possible
   - Optimize image sizes before uploading

## Implementation Plan

### Phase 1: Setup and Authentication

1. Create Google Cloud Project and enable APIs
2. Set up OAuth credentials
3. Implement authentication flow
4. Create test album and verify access

### Phase 2: API Integration

1. Develop API client for fetching album data
2. Implement caching strategy
3. Add error handling and fallback mechanism
4. Test with real album data

### Phase 3: UI Development

1. Create PhotoGallery component
2. Implement loading states and error handling
3. Add responsive grid layout
4. Display photo captions and metadata

### Phase 4: Testing and Documentation

1. Write unit tests with mocked API responses
2. Test error scenarios and fallback mechanism
3. Document setup process for future reference
4. Update README with integration details

## Fallback Strategy

To ensure the gallery works even if the API is unavailable:

1. Include a small set of sample images in the repository
2. Implement detection of API failures
3. Automatically switch to local images if API fails
4. Add a visual indicator when using fallback images

## Security Considerations

1. Use read-only API scopes
2. Never expose API keys in client-side code
3. Implement proper CORS configuration
4. Consider rate limiting to prevent abuse
5. Use HTTPS for all API calls

## Maintenance Considerations

1. Monitor API usage and quotas
2. Implement proper error logging
3. Document the process for updating albums
4. Consider periodic token refresh strategy
5. Plan for API version changes
