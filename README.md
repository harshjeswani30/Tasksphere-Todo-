# TaskSphere

TaskSphere is a MERN-based todo application for managing tasks with a clean two-panel interface, API-driven CRUD operations, and local test coverage.

1. Overview

The application includes task creation, editing, completion toggles, deletion, filtering, search, and sorting. The frontend is built with React and Vite, while the backend exposes a REST API backed by MongoDB and Mongoose.

2. Key Features

• Create tasks with title, description, and due date
• Edit and update existing tasks
• Mark tasks complete or incomplete
• Filter tasks by all, active, and completed states
• Search and sort the task list
• View task statistics in a dedicated summary panel
• Run the full stack locally or through Docker Compose

3. Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React, Vite, Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Testing | Jest, React Testing Library |
| Containerization | Docker, Docker Compose |

4. Project Structure

```text
backend-project/
├── backend/              # Express API
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── frontend/             # React UI
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   └── index.css
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── POSTMAN_COLLECTION.json
└── README.md
```

5. Prerequisites

• Node.js 18+
• pnpm
• MongoDB running locally, or Docker Desktop for containerized setup

6. Run With Docker Compose

1. Open a terminal in the project root.
2. Start the full stack:

```bash
docker compose up --build
```

3. Open the application:

• Frontend: `http://localhost:3000`
• Backend: `http://localhost:5000`

To stop and remove the containers:

```bash
docker compose down -v
```

7. Run Locally

7.1 Backend

```bash
cd backend
pnpm install
pnpm run dev
```

If needed, create `backend/.env` with:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todoapp
NODE_ENV=development
```

7.2 Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

The Vite server usually runs at `http://localhost:5173`.

8. Tests

Run the frontend test suite from the frontend folder:

```bash
pnpm test
```

9. API Testing

Import `POSTMAN_COLLECTION.json` into Postman to test the REST endpoints:

• GET `/api/todos`
• GET `/api/todos?status=pending`
• GET `/api/todos?status=completed`
• POST `/api/todos`
• PUT `/api/todos/:id`
• DELETE `/api/todos/:id`

10. Notes

• The frontend expects the API at `/api/todos`.
• The app is designed to run as a single workflow, with Docker Compose recommended for the fastest setup.
