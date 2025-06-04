## [0.5.0] - 2025-06-03

### 📝 Reviews System & UI

- **Reviews Display**:
  - Created a dedicated `/district/[id]/reviews` page to show all reviews for a district.
  - Enhanced `ReviewCarrousel`:
    - Long comments are truncated with an option to view full content in a modal.
    - Clicking on a review opens a modal displaying the full comment.

- **Modal Improvements**:
  - `Modal` component now supports dynamic content injection.
  - Each modal uses a unique dynamic ID for more flexible use across components.

- **Ratings Data Flow**:
  - On rating submission, the `average_rating` is saved directly in the ratings table.
  - Added logic to calculate and update average rating per review.
  - Introduced a `Card` component to display rating summaries cleanly.
  - Added a dedicated type file for reviews for better TypeScript support.

- **District Page Enhancements**:
  - Now displays the number of reviews under the score.
  - Users can navigate from an district reviews back to its related district page.

- **Developer Tools**:
  - Created mock reviews to facilitate front-end development and testing.

### ♻️ Refactors & Wording Adjustments

- Renamed `total_score` to `average_rating` in the UI and backend for consistency and clarity.

