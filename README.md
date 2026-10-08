# Willovate Resto

Willovate Resto is a restaurant-management web application with a React dashboard and an Express API backed by MongoDB. Staff can manage menu items, categories, tables, and orders after signing in.

## Features

- Sign in with a JWT-backed account.
- View a dashboard with food, order, table, and order-amount summaries.
- Search and filter menu items by category; add, edit, and delete foods.
- Create, edit, and delete food categories.
- Add, edit, and delete restaurant tables.
- Create orders for a customer, food item, quantity, and available table; update order status or delete orders.
- Persist application data in MongoDB through Mongoose.

There is no preconfigured account or seed data. The backend provides an account-registration API; the frontend currently provides a login screen but no registration screen.

## Tech stack

- Frontend: React, Vite, React Router, Axios, and CSS.
- Backend: Node.js, Express, Mongoose, MongoDB, bcryptjs, JSON Web Tokens, CORS, and dotenv.
- Backend development server: nodemon.

## Project structure

```text
willovate-resto/
├── backend/
│   ├── controllers/       # Authentication, food, and order handlers
│   ├── middleware/        # JWT authentication
│   ├── models/            # User, food, category, table, and order schemas
│   ├── routes/            # REST API routes
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example       # Safe backend configuration template
│   └── server.js          # Express server and MongoDB startup
├── public/                # Static assets
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/          # Axios API clients
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .env.example           # Optional frontend API URL
├── package.json           # Frontend scripts and dependencies
├── package-lock.json
└── README.md
```

## Prerequisites

- Node.js 22.12 or newer (or Node.js 20.19 or newer) and npm. These versions satisfy the Vite version used by this project.
- A reachable MongoDB instance: MongoDB Community Server running locally, or a MongoDB Atlas deployment.
- Git to clone the repository.

## Run the application

Follow this order: **Clone → Install → Configure → Database → Run Backend → Run Frontend → Use Application**.

### 1. Clone

Replace `<repository-url>` with the clone URL for your copy of this repository:

```sh
git clone <repository-url>
cd willovate-resto
```

### 2. Install

Install the frontend dependencies from the project root:

```sh
npm install
```

Install backend dependencies in a second step:

```sh
cd backend
npm install
cd ..
```

### 3. Configure environment variables

From the project root, create the backend environment file from the committed example. In PowerShell:

```powershell
Copy-Item backend\.env.example backend\.env
```

Edit `backend\.env` and set `MONGO_URI` to your MongoDB connection string. For local MongoDB, the example uses:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/willovate-resto
```

Replace the example `JWT_SECRET` with a long, random secret. For example, generate one locally with:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Copy the generated value into `backend\.env`; do not share it or commit the file. `PORT` is optional and defaults to `5000`.

The frontend defaults to `http://localhost:5000/api`. To use a different backend URL, copy `.env.example` to `.env` in the project root and set `VITE_API_URL` to the complete API base URL, for example `http://localhost:5000/api`. Frontend variables prefixed with `VITE_` are included in browser code and must never contain secrets.

For the optional frontend override, create the root file in PowerShell with:

```powershell
Copy-Item .env.example .env
```

Environment files are ignored by Git. The `.env.example` files contain placeholders only.

### 4. Start MongoDB

Start your local MongoDB service before starting the backend, or confirm that your Atlas deployment is reachable. For Atlas, use its connection URI as `MONGO_URI` and ensure the development machine is permitted to connect.

### 5. Run the backend

From the project root:

```sh
cd backend
npm run dev
```

The server connects to MongoDB before listening. Successful startup prints a MongoDB connection message and the listening port. The API is available at `http://localhost:5000` by default. For a non-development process, use `npm start` instead of `npm run dev`.

### 6. Run the frontend

Open a second terminal at the project root and run:

```sh
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

### 7. Use the application

There is no default user. Create an account by sending a `POST` request to `/api/auth/register` with JSON fields `name`, `email`, and `password` (minimum six characters), then sign in from the frontend with that email and password. Once signed in, create categories, foods, and tables before creating orders.

For example, from PowerShell with the backend running, replace the sample values before sending:

```powershell
$body = @{
  name = "Your Name"
  email = "you@example.com"
  password = "replace-with-your-password"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

## API overview

The backend also exposes `GET /` as a simple server availability response. The following routes are mounted under `/api`:

| Resource | Routes | Authentication |
| --- | --- | --- |
| Authentication | `POST /auth/register`, `POST /auth/login` | Public |
| Foods | `GET /foods`, `POST /foods`, `PUT /foods/:id`, `DELETE /foods/:id` | Bearer token |
| Categories | `GET /categories`, `POST /categories`, `PUT /categories/:id`, `DELETE /categories/:id` | Bearer token |
| Tables | `GET /tables`, `POST /tables`, `PUT /tables/:id`, `DELETE /tables/:id` | Bearer token |
| Orders | `GET /orders`, `POST /orders`, `PUT /orders/:id`, `DELETE /orders/:id` | Bearer token |

After a successful login, the API returns a JWT and a user summary. The frontend stores the token in browser `localStorage` and sends it in the `Authorization: Bearer <token>` header for protected requests. Tokens expire after one day. Registration creates an account but does not sign the user in; log in after registering.

## Common issues

- **Backend exits before listening:** Check that `backend\.env` exists, that `MONGO_URI` and `JWT_SECRET` are set, and that MongoDB is running and reachable.
- **MongoDB connection failure:** Check the MongoDB service, the URI/database access settings, and Atlas network access if using Atlas.
- **Port 5000 is already in use:** Stop the other service or set a free `PORT` in `backend\.env`; if it changes, set the matching `VITE_API_URL` in the root `.env` and restart Vite.
- **Login returns an authentication error:** Register an account using `POST /api/auth/register` first, then use the same email and password on the login screen.
- **Frontend cannot reach the API:** Confirm the backend is running, check `VITE_API_URL` (if configured), and restart Vite after changing frontend environment variables.
- **Dependency or Vite engine errors:** Use a supported Node.js version listed under Prerequisites, then run `npm install` in the project root and `backend`.

## Development checks

Run these commands from the project root:

```sh
npm run lint
npm run build
```

The backend currently has no automated test suite. `npm start` and `npm run dev` start the same API; the latter restarts the server when backend files change.

## Future improvements

- Add automated backend/API tests.
- Add a frontend account-registration screen and richer form validation.
- Add more detailed operational and reporting views.
- Configure deployment-specific CORS and production hosting settings.

## Author

Pratik Paliwal
