## [0.14.7] - 2025-07-23

✨ Features

- **Login Flow**
  - Stored the **last visited path** before login to enhance redirect accuracy
  - After login or signup with Google, users are redirected to their **previously visited page**
- **Rating Flow**
  - After submitting a rating, users are now redirected to a **rate-confirmation page**

🛠️ Fixes

- **Navigation**
  - Ensured redirection to **home after logout**
- **RatingCard**
  - Fixed issue with the **"open comment modal"** button not triggering
- **Hydration**
  - Wrapped components using `useSearchParams()` inside **`<Suspense>` boundaries** to avoid build errors
- **Text & Copy**
  - Updated label from **"Cost of Living" → "Affordability"** for clarity
  - Added **`/10` indicators** next to scores for better user understanding
