## [0.6.0] - 2025-06-05

### 👍 Review Voting System

- **Voting Functionality**:
  - Users can **upvote or downvote** a review.
  - Users can **update or remove** their previous vote.
  - Total votes (up + down) are displayed per review.

- **Backend Logic**:
  - Created a flexible **votes API route**:
    - Handles add/update/delete of votes.
    - Returns the vote status for the current user on a specific review.

- **Frontend Integration**:
  - Built a custom **votes hook** to:
    - Fetch and render all votes at component mount.
    - Display real-time vote status (upvoted/downvoted) per review.

