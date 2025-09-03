## [0.14.8] - 2025-08-02

✨ Features

- **Voting**
  - **RatingCard** now redirects users to the **login page** if they try to vote while not connected
- **Survey System**
  - Added **survey UI** on the rate-confirmation page
  - Created **API route and database table** to handle survey submissions and store responses

🛠️ Fixes

- **Voting**
  - Made **vote counts public** while keeping the **voting action protected for authenticated users**

🔧 DevOps

- **Development Environment**
  - Set **Prettier** as the default code formatter
