# Shelflyst

**Live:** <https://shelflyst-frontend.vercel.app>

Shelflyst is a personal book-collection app. You sign up, search for books, add them to your own
shelf, and see what other readers have shared on a community shelf.

This repository is the React frontend. The REST API lives in
[shelflyst-backend](https://github.com/smibrahimali1423/shelflyst-backend).

## Features

- Sign up and log in with JWT authentication; protected pages send signed-out users back to login
- Search books through the Google Books API and open a details page for each result
- Add and remove books on your own shelf, or clear it
- A shared-books feed of books other users have added to the community shelf
- Profile and settings pages, including account deletion

## Tech

| Area | Used |
|---|---|
| UI | React 18, React Router 6, Bootstrap 5 |
| State | Redux Toolkit (slices and thunks for auth, books, search, shared books) |
| Data | Google Books API; Shelflyst REST API (Express, MongoDB) |
| Tests | Jest and React Testing Library |
| Hosting | Vercel |

## Project layout

```
src/
  App.js              routes and the protected-route wrapper
  components/         pages and UI pieces (Login, Signup, BookSearch, BookItemList, SharedBooks, ...)
  redux/              store, slices and thunks that call the API
```

## Running locally

Requires Node 18 or later.

```bash
npm install
echo "REACT_APP_GOOGLE_BOOKS_API_KEY=your-key" > .env.local
npm start
```

The app opens on <http://localhost:3000> and talks to the deployed API. Get a Google Books key
from the Google Cloud console (APIs & Services → Credentials).

## Tests

```bash
npm test
```

The tests check that the login page renders, that protected pages redirect signed-out users to
login, and that the auth reducer handles login, failure and logout.
