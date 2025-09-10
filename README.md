# Project

A simple two-part application:
- **Frontend:** React app for listing and managing Users and Posts.
- **Backend:** NestJS REST API with in-memory data (no database).

---

## Tech Stack

**Frontend**
- React 18, TypeScript, Vite (SWC)
- React Router, Axios
- Tailwind CSS v4 (`@tailwindcss/vite`)
- ESLint (flat config)

**Backend**
- NestJS
- In-memory data (Users, Posts)
- CORS enabled for `http://localhost:5173`

---

## Project Structure

project-root/
├─ frontend/
│ ├─ src/
│ │ ├─ components/ # UserForm, UsersTable, PostForm, PostsTable
│ │ ├─ pages/ # HomePage, UsersPage, PostsPage
│ │ ├─ services/ # backend.ts (API client)
│ │ ├─ App.tsx, main.tsx, index.css
│ └─ .env.example # VITE_API_URL example
│
└─ backend/
└─ src/
├─ main.ts # bootstrap + CORS
├─ app.module.ts # imports UsersModule, PostsModule
├─ users/ # controller + service + entity
└─ posts/ # controller + service + entity

---

## Prerequisites

- Node.js **18+**
- npm

---

## Setup & Run

### 1-Backend
```bash
cd backend
npm install
npm run start:dev
# API → http://localhost:3000
# Note: GET / returns 404 (by design). Use /users and /posts.

---

### 2- Frontend

cd ../frontend
cp .env.example .env   # ensure VITE_API_URL=http://localhost:3000
npm install
npm run dev
# UI → http://localhost:5173


##Environment Variables

VITE_API_URL=http://localhost:3000

---

Frontend

## Routes

/ — Home

/users — Users list + create / edit / delete

/posts — Posts list + create / edit / delete (shows relation via userId)

## API Client

src/services/backend.ts centralizes all HTTP calls (clean separation of concerns).

## Scripts

npm run dev       # start dev server
npm run build     # production build
npx eslint .      # lint

---

## Backend (API)

## Users

GET /users — list

GET /users/:id — by id

POST /users — create { name, username, email }

PATCH /users/:id — partial update { name?, username?, email? }

DELETE /users/:id — delete

## Posts

GET /posts — list

GET /posts/:id — by id

POST /posts — create { userId, title, body? }

POST /posts/user/:userId — create for a user { title, body? }

PATCH /posts/:id — partial update { userId?, title?, body? }

DELETE /posts/:id — delete

## Notes

Data is in-memory (resets on server restart).

CORS is enabled for http://localhost:5173 in main.ts.


## Backend scripts

npm run start:dev   # dev (watch)
npm run start       # production

License

MIT (or your preferred license)

If you’d like, I can also generate minimal `frontend/README.md` and `backend/README.md` files that mirror this, but scoped to each folder.
::contentReference[oaicite:0]{index=0}
