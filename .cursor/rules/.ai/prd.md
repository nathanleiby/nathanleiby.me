# **Product Requirements Document (PRD)**

## **Goal**

Enhance [nathanleiby.me](https://nathanleiby.me/) to include a **bicycle touring section**, a **blog**, and **responsive design improvements**, ensuring the site is fast, accessible, and visually consistent across devices.

---

## **Features and Subtasks**

### **Feature 1: Bicycle Touring Section**

**Goal:** Display bicycle touring routes with maps, metrics, and photos in a clean and simple design.

#### **Subtasks:**

1. **Map Integration:**

   - Use **Leaflet** (open-source and lightweight) for displaying routes.
   - Simulate a fake GPX route (e.g., Tokyo → Osaka → Kyoto → Tokyo) for initial implementation.
   - Display the route as a static line on the map (no interactivity like clickable waypoints or zooming).

2. **Route Metrics:**

   - Display the following metrics in a clean, minimal design:
     - Distance
     - Duration
     - Elevation gain
     - Start and end points
   - Use a simple table or card layout for metrics.

3. **Photos:**

   - Display 2-3 relevant photos in a grid or simple gallery format.
   - Host photos locally in the GitHub repo.
   - Link photos directly to the route section (no specific points on the map).

4. **Data Source:**

   - Use GPX files for route data (simulate a fake GPX file for initial implementation).
   - No admin interface required; manually upload GPX files to the repo.

5. **Real Data:**

   - Use actual GPX files from `data/gpx/east-hokkaido`
   - Merge them into a single simple GPX route for one Tour "East Hokkaido Tour"

6. **Add Text content:**
   - If available, include text for a tour.
   - For example, the tour description of east hokkaido is available in the data folder as a `tour.md` file.

---

### **Feature 2: Blog Section**

**Goal:** Create a simple, Markdown-based blog that renders beautifully and supports code snippets and LaTeX equations.

#### **Subtasks:**

1. **Markdown Rendering:**

   - Use a Markdown-to-HTML converter (e.g., `react-markdown`).
   - Support syntax highlighting for code snippets (e.g., using `react-syntax-highlighter`).
   - Support LaTeX for math equations (e.g., using KaTeX).

2. **Blog Management:**

   - Store blog posts as local Markdown files in the GitHub repo.
   - No admin interface; manually edit Markdown files in the repo.

3. **Blog Design:**
   - Display blog posts in a simple list of title links.
   - Clicking a title opens the full post in a minimal, clean layout.
   - No pagination or infinite scrolling needed.

---

### **Feature 3: Responsive Design**

**Goal:** Ensure the site is fully responsive and works well on mobile devices, tablets, and desktops.

#### **Subtasks:**

1. **Menu Interaction:**

   - Implement a hamburger menu for mobile devices.
   - Make the menu collapsible on larger screens.

2. **Maps:**

   - Ensure maps resize dynamically based on screen size.
   - No additional interaction modes for mobile vs. desktop.

3. **General Responsiveness:**
   - Use default breakpoints for average iPhone/Android devices.
   - Ensure images and media resize or adapt for different screen sizes.

---

## **Testing Strategy**

**Goal:** Implement sanity-check-level automated testing to ensure core functionality works as expected.

#### **Subtasks:**

1. **Unit Tests:**

   - Use **Jest** to test individual components and functions.
   - Focus on core functionality (e.g., page loads, links work).

2. **Integration Tests:**

   - Test interactions between components (e.g., map rendering, blog post rendering).
   - Use mocks for external dependencies (e.g., GPX file parsing).

3. **End-to-End (E2E) Tests:**
   - Use **Jest** or **Cypress** to test user flows (e.g., navigating to the blog, viewing a route).
   - Ensure tests run automatically in CI/CD pipelines.

---

## **Tech Stack**

- **Frontend:**
  - **React** with **Mantine** components.
  - **Leaflet** for map visualization.
  - **D3** for visualizations (if needed).
  - **react-markdown** and **KaTeX** for Markdown rendering and LaTeX support.
- **Hosting:**
  - **GitHub Pages**.
- **Testing:**
  - **Jest** for unit and integration tests.
  - **Cypress** (optional) for E2E tests.

---

## **Timeline**

**Priority:** ASAP, implemented incrementally.

1. **Phase 1: Bicycle Touring Section**

   - Implement map integration, route metrics, and photos.
   - Simulate a fake GPX route for testing.

2. **Phase 2: Blog Section**

   - Set up Markdown rendering with syntax highlighting and LaTeX support.
   - Create a simple blog layout.

3. **Phase 3: Responsive Design**

   - Implement hamburger menu and ensure maps and media are responsive.

4. **Phase 4: Testing**
   - Write and automate sanity-check-level tests.

---

## **Performance and Accessibility**

- **Performance:**
  - Implement lazy loading for images (optional).
  - No CDN required.
- **Accessibility:**
  - Ensure compliance with WCAG standards (e.g., keyboard navigation, ARIA labels).
  - No dark mode required.

---

Let me know if you’d like to adjust or add anything to this PRD! Once finalized, this document will serve as a clear roadmap for implementing the new features on your website.
