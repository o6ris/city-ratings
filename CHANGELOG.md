## [0.2.0] - 2025-05-24

### ⭐️ District Rating Feature

- **District Rating Flow**:
  - Created a `POST /rating` route allowing users to rate a district.
  - Built `usePostRating` hook and `SubmitRatingButton` to handle rating submission.
  - Created a `RatingForm` with multiple range inputs and a textarea for comments.
  - Displayed total score dynamically and styled the form for both mobile and desktop.

- **Dynamic District Page**:
  - Implemented `[districtId]` page to fetch and display a single district by ID ready for rating.

- **Signup Enhancements**:
  - Upon signup, users are inserted into the `user` table.

### 🎨 UI & Design Improvements

- **New UI Components**:
  - Created reusable `Range`, `Textarea`, and `Icon` components.
  - Installed and configured **DaisyUI** and **Lucide React** icons.

- **Styling Enhancements**:
  - Customized the global theme and typography (font size, weight, and colors).
  - Styled `p`, `span`, `label`, and headings for a cleaner, cohesive look.
  - Improved styles for rating components, labels, and responsive design.

### 🔧 Fixes & Refactors

- Removed `quality_of_life` field as it no longer exists in the data model.
- Fixed rating trigger function for consistent updates.
