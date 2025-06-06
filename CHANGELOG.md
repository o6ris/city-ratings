## [0.07.0] - 2025-06-06

### ⭐ User Review Management

- **View Own Review**:
  - When accessing a district's rating page, the app checks if the user has already reviewed the district.
  - If so, the form is pre-filled with existing data for editing convenience.

- **Update Rating**:
  - Users can now **update their review**.
  - Average score is **recalculated** accordingly in the database.

- **Delete Rating**:
  - Users can **delete their review** via a new `DeleteRatingButton` component.
  - Deletion automatically adjusts the district’s aggregate data.

- **UX Enhancements**:
  - After submitting a review, the app **navigates back** to the district page.
  - Each `RatingCard` displays a direct link for users to **edit their review**.

