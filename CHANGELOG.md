## [0.14.5] - 2025-07-23

✨ Features

- **Contact Page**
  - Created a **contact form** and corresponding `/contact` route
  - Integrated the form into the **About Us** page
  - Added a **toast bar** for submit confirmation feedback
  - Improved **error handling** in `useContact` and `ContactForm` for better UX

🛠️ Fixes

- **Navigation**
  - Ensured **auth detection remains client-side** to prevent hydration mismatches
- **Middleware**
  - Defined **public API routes** for `/contact` to avoid unintended protection
- **Toast Notification**
  - Fixed **type definition** in toast configuration
