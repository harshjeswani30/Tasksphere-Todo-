# TaskSphere - Premium MERN Todo Application

TaskSphere is a state-of-the-art MERN stack Todo Application featuring a high-fidelity glassmorphic dark-mode interface, dynamic progress analytics, calendar due-date mapping, and overdue alerts. The project is designed with rigorous backend API validation, Jest frontend testing, and containerized orchestration.

---

## Features

- **Dynamic Stats Board**: A premium panel showing active metrics (Total, Completed, Pending, Overdue tasks) and a gradient completion progress tracker.
- **Rich Task Editor**: A unified card form supporting title verification, description expansion, and date picking.
- **Smart Due Dates**: Highlighted badges visually signaling pending or overdue tasks (completed tasks automatically clear overdue status).
- **Responsive Navigation Tabs**: Filter items instantly between **All**, **Active**, and **Completed** tasks.
- **Glassmorphic Theme**: Sophisticated slate-and-indigo workspace design utilizing high-end CSS variables, SVG icons, and subtle micro-animations.

---

## Tech Stack

- **Frontend**: React 19, Vite, Axios, Lucide Icons, Custom CSS3 Design System
- **Backend**: Node.js, Express.js (REST API, request validation, global error boundaries)
- **Database**: MongoDB, Mongoose ODM (Data modeling with validation rules)
- **Testing**: Jest, React Testing Library (Axios API mock pipelines)
- **Containerization**: Docker, Docker Compose

---

## Project Structure

```bash
backend-project/
├── backend/                  # Node.js Express Backend API
│   ├── src/
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express router endpoints
│   │   └── index.js          # App setup & MongoDB bridge
│   ├── Dockerfile            # Container build instructions
│   └── package.json          # Node dependencies
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # StatsPanel, TodoForm, TodoItem, TodoList
│   │   ├── App.jsx           # Global state & Axios calls
│   │   ├── App.test.jsx      # Automated integration Jest tests
│   │   ├── index.css         # Customized premium styling
│   │   └── setupTests.js     # Jest DOM setup
│   ├── Dockerfile            # Container build instructions
│   ├── babel.config.cjs      # Babel testing compiler config
│   ├── jest.config.cjs       # Jest environment overrides
│   └── package.json          # React dependencies
├── docker-compose.yml        # Multi-container orchestrator
├── POSTMAN_COLLECTION.json   # Ready-to-import API definitions
└── README.md                 # Deployment instructions
```

---

## How to Run the App

There are two ways to deploy the application: **Using Docker Compose (Recommended)** or **Running Manually/Locally**.

### Option A: Using Docker Compose (Recommended)

Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

1. **Clone or navigate** to the project root directory.
2. **Build and start the containers** with a single command:
   ```bash
   docker compose up --build
   ```
3. Once running, you can access the application at:
   - **Frontend UI**: `http://localhost:3000`
   - **Backend API**: `http://localhost:5000`
   - **MongoDB Database**: `mongodb://localhost:27017`

To shut down and clean up resources, use:
```bash
docker compose down -v
```

---

### Option B: Running Manually (Locally)

If you prefer to run the components natively on your machine, you will need **Node.js (v18+)**, **MongoDB** installed and running on your local machine, and **pnpm** installed globally.

#### 1. Setup Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file by copying the example template:
   ```bash
   copy .env.example .env
   ```
4. Verify MongoDB is running locally (`mongodb://127.0.0.1:27017`).
5. Launch the backend API:
   - For production mode: `pnpm start`
   - For development mode (with hot reloading): `pnpm run dev`
   - The backend runs on `http://localhost:5000`.

#### 2. Setup Frontend
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   pnpm install
   ```
3. Launch the React development server:
   ```bash
   pnpm run dev
   ```
4. Access the React workspace in your browser at the local dev URL (Vite default is usually `http://localhost:3000` or `http://localhost:5173`).

---

## Running Automated Tests

To run the frontend component and API integration test suite using Jest and React Testing Library:

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Run the test script:
   ```bash
   pnpm test
   ```
   Jest will compile the files using Babel and output execution stats for all tests.

---

## API Testing with Postman

Import the `POSTMAN_COLLECTION.json` file located in the root directory into your Postman client to test the Express API routes directly. The collection contains the following pre-configured requests:
- **GET All Todos**: Retrieves all items in the database.
- **GET Filtered Todos (Pending)**: Queries only active items using `?status=pending`.
- **GET Filtered Todos (Completed)**: Queries only completed items using `?status=completed`.
- **POST Create Todo**: Submits a new Todo card with validation.
- **PUT Update Todo**: Updates title, description, or toggles completed status.
- **DELETE Todo**: Deletes a Todo document from the database.

# Tasksphere-Todo-
