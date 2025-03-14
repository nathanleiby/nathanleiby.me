# Security Policy

## Known Vulnerabilities

### Production Dependencies

#### react-simple-maps (v3.0.0)

- **Issue**: Depends on vulnerable versions of d3-color and related packages
- **Severity**: High (GHSA-36jr-mh4h-2g58)
- **Impact**: ReDoS (Regular Expression Denial of Service) vulnerability
- **Risk Assessment**: LOW
  - These vulnerabilities are primarily concerning for server-side processing
  - Our usage is client-side only, limiting the attack surface
  - No user input is passed to the vulnerable regular expressions
- **Mitigation Plan**:
  - Monitor for updates to react-simple-maps
  - Consider alternative mapping libraries in future iterations
  - Current version maintained for stability and React 18 compatibility

### Development Dependencies

#### esbuild (via vite and testing infrastructure)

- **Issue**: Development server can accept requests from any origin
- **Severity**: Moderate (GHSA-67mh-4wv8-2f99)
- **Impact**: Only affects development environment
- **Risk Assessment**: LOW
  - Only present in development environment
  - Not present in production builds
  - Local development only
- **Mitigation Plan**:
  - Keep development strictly local
  - Monitor for updates to vite and related packages
  - Consider network isolation during development if needed

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by:

1. Opening a security advisory on the GitHub repository
2. Emailing the maintainers directly
3. Do NOT create public issues for security vulnerabilities

## Update Schedule

Security updates are reviewed and applied:

- Immediately for critical vulnerabilities affecting production
- Weekly for moderate-risk vulnerabilities
- Monthly for low-risk and development-only vulnerabilities

Last reviewed: February 2024
