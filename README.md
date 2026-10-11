# Studyspace

## Run locally

Use Node.js 22.13 or newer (Node 24 is recommended for the built-in SQLite module).

In one terminal, from the `study-mate-ai` folder, start the API:

```bash
npm run dev
```

In another terminal, from the same folder, start the frontend:

```bash
npm run dev:web
```

Open the Vite URL printed in the second terminal. The frontend proxies `/api` requests to the API at `http://localhost:3001`. The SQLite database is created automatically at `backend/data/studyspace.sqlite`.

## API

- `GET /api/health` — API health check
- `POST /api/auth/signup` — create an account (`name`, `email`, `password`)
- `POST /api/auth/login` — sign in (`email`, `password`)
- `GET /api/auth/me` — get the current account (Bearer token required)
- `POST /api/auth/logout` — revoke the current session

Signup and login return a bearer token and the account profile. Passwords are salted and hashed with Node's scrypt; session tokens are stored as SHA-256 hashes in SQLite. Configure `PORT`, `DATABASE_PATH`, or `CLIENT_ORIGINS` through environment variables for a hosted deployment.
