# TravelFactory HA - (Client + Server)

This repository contains a Vue 3 client and a Node/Express server.

## Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (for the server)

## Quick Start

1) Install dependencies

```bash
# from repo root
cd server && npm install
cd ../client && npm install
```

2) Configure environment variables

Server (`server/.env`):

1) create .env file inside server folder
2) use data from "env_server" file attached to email


Client (`client/.env`):
1) create .env file inside client folder
2) use data from "env_client" file attached to email

Note: Firebase is already configured in `client/src/firebase/firebase.js`.

3) Run the apps (two terminals)

Server:
```bash
cd server
npm run dev    # hot reload via nodemon
# or: npm start
```

Client:
```bash
cd client
npm run dev
```

The client will typically run on http://localhost:8080 and the server on http://localhost:3000.

## Project Structure
```
root/
  client/            # Vue 3 app (Naive UI, Vue Router, Vuex)
  server/            # Express API (Knex + PostgreSQL)
```

## Important Endpoints (Server)
- GET ` /api/vacations` - list vacation requests (validators see all; others filtered by user)
- POST `/api/vacations` - create a vacation request
- POST `/api/vacations/:id/status` - update request status
- GET ` /api/users/:id` - get user info (role, name)

## Technical choices
- Vue 3 Composition API — chosen for its modern, readable, and React-like approach to building components.

- Naive UI — provides a wide range of polished, ready-to-use components with great UX.

- Neon DB — a convenient and lightweight cloud Postgres solution, perfect for small projects.

- Knex.js — used instead of Sequelize for faster setup and simplicity, as a full ORM felt unnecessary for this project.

## Limitations
- Neon DB is convenient for small projects but may become less optimal as the system scales.

- Knex.js provides low-level query control, which can slow development in larger projects.

- Authentication and authorization mechanisms are only partially implemented.

- Middleware-based authorization checks should be added for better security.