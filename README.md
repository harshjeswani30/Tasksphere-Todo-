# TaskSphere

TaskSphere is a MERN-based todo application for managing tasks with a clean two-panel interface, API-driven CRUD operations, and local test coverage.

**Overview**

The application includes task creation, editing, completion toggles, deletion, filtering, search, and sorting. The frontend is built with React and Vite, while the backend exposes a REST API backed by MongoDB and Mongoose.

**Key Features**

| Capability | Description |
| --- | --- |
| Create tasks | Add a title, description, and due date |
| Edit tasks | Update an existing task in place |
| Completion control | Mark tasks complete or incomplete |
| Task discovery | Filter, search, and sort the list |
| Task insights | View totals, completion, and status summary |
| Deployment | Run locally or with Docker Compose |

**Tech Stack**

| Layer | Tools |
| --- | --- |
| Frontend | React, Vite, Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Testing | Jest, React Testing Library |
| Containerization | Docker, Docker Compose |

**Project Structure**

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

**Prerequisites**

| Requirement | Details |
| --- | --- |
| Runtime | Node.js 18 or newer |
| Package manager | pnpm |
| Database | MongoDB locally, or Docker Desktop for containers |

**Run With Docker Compose**

Open a terminal in the project root and start the full stack with the command below.

```bash
docker compose up --build
```

Once the containers are running, the frontend is available at `http://localhost:3000` and the backend is available at `http://localhost:5000`.

To stop and remove the containers:

```bash
docker compose down -v
```

**Run Locally**

**Backend**

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

**Frontend**

```bash
cd frontend
pnpm install
pnpm run dev
```

The Vite server usually runs at `http://localhost:5173`.

**Tests**

Run the frontend test suite from the frontend folder:

```bash
pnpm test
```

**API Testing**

Import `POSTMAN_COLLECTION.json` into Postman to test the REST endpoints. The collection includes GET `/api/todos`, GET `/api/todos?status=pending`, GET `/api/todos?status=completed`, POST `/api/todos`, PUT `/api/todos/:id`, and DELETE `/api/todos/:id`.

**Notes**

The frontend expects the API at `/api/todos`. The app is designed to run as a single workflow, with Docker Compose recommended for the fastest setup.
