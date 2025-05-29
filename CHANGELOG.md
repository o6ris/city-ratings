## [0.4.0] - 2025-05-29

### 🔐 Authentication System

- **Login & Signup Pages**:
  - Created dedicated signup page.
  - Updated UI of login page with improved layout and styling.
  - Introduced a reusable `LoginForm` used in both login and signup pages.

- **Auth Flow Enhancements**:
  - After signup, users are redirected to an email confirmation page.
  - Implemented signup and login using Google OAuth.
  - Created a centralized `auth-actions.ts` file to handle all auth logic (signup, signin, signout).
  - Added a `signout` function with confirmation modal using a reusable `Modal` component.

- **Error Handling & UX**:
  - Login form now dynamically displays validation and server-side errors.

- **Middleware & Route Protection**:
  - Introduced public route handling via middleware.
  - Refactored middleware to dynamically protect or allow routes depending on user session.

### 🧭 Layout & Navigation

- **Navigation Bar**:
  - Added basic navigation layout for home and auth-related pages.
  - Improved navigation behavior based on auth state (e.g., signout appears only when logged in).

- **Other Improvements**:
  - Used `window.location` for auth callback to avoid stale routing issues post-login/signup.
