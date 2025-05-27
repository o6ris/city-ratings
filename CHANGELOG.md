## [0.3.0] - 2025-05-26

### 🏙️ District Rating & Review Display

- **District Rating Page**:
  - Split district details and rating submission into two dedicated pages.
  - Implemented new route to fetch both district details and related `district_rating` records.

- **Data Handling**:
  - Refactored rating criteria to be returned as a single object.
  - Fixed data types and response format from join tables.
  - Created dictionary mappings for criteria label & icon rendering.
  - Sorted reviews by most recent first for better relevance.
  - Added fallback UI when no ratings are available.

- **Review Carousel**:
  - Created `ReviewCarousel` component to display district reviews.
  - Each review shows its individual criteria ratings and submission date.

### 🛠️ Improvements & Styling

- Enhanced global body styling to maintain layout consistency.
- Added more district-specific info on the district page (e.g., rank, score, review count).
