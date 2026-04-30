# Personal Expense Tracker

## 1. Tech Stack & Deployment

- Frontend Environment: React.js built with Vite.
- Frontend Styling: Plain CSS (no Tailwind/Bootstrap).
- Backend Environment: Node.js with Express.js.
- Backend & DB Deployment: Railway (Postgres).
- Frontend Deployment: Vercel (static build).

Notes: Backend is deployed to Railway with a Postgres database to ensure persistent connections and avoid serverless cold-start/connection issues.

## 2. Core Features

- Add Expense: Form capturing Amount, Category, Description, and Date.
- View Expenses: Real-time table rendering of all expenses.
- Advanced Filtering: Filter by Category, Min Amount, Max Amount, Start Date, and End Date.
- Sorting: Sort by Newest First (default) or Oldest First.
- Dynamic Totals: Calculates the total sum of currently visible (filtered) expenses.

## 3. Key Design Decisions

### Accurate Money Handling 

- JavaScript floating-point arithmetic is unreliable for currency. To avoid errors, the frontend multiplies user-entered Rupees by 100 and sends Paisa as an integer to the backend. The database stores `amount` as an `INTEGER NOT NULL` (paisa). The frontend divides by 100 when rendering amounts.

### Idempotency & Network Resilience

- To prevent duplicate records from retries or double-submits, the backend generates an `idempotency_key` using a SHA-256 hash of the payload fields (amount-category-description-date). The database enforces a UNIQUE constraint on this key. If a duplicate request is received, the backend returns the existing record instead of inserting a new row.

### React State Synchronization

- The app uses a `refreshTrigger` pattern in `App.jsx` to re-fetch expenses after mutations. This avoids global state libraries while preserving currently active filters via `URLSearchParams`, ensuring UX consistency when new items are added.

## 4. Trade-offs & Constraints 
- Idempotency Limitation: Because the idempotency key is a hash of the expense content, two identical expenses (same amount, category, description, date) cannot be added as distinct entries. This was an intentional trade-off to provide reliable idempotency without extra client-side UUIDs.
- No Authentication: Authentication (JWT/OAuth) was intentionally omitted to focus the scope on core CRUD functionality, idempotency, and data integrity.

## 5. Project Structure 

- `frontend/` — Vite + React application; plain CSS styles in `src/`.
- `backend/` — Express.js API; connects to Railway Postgres.

## 6. Quick Notes

- Currency conventions: frontend multiplies by 100 (paisa) before POST; backend stores integers.
- Backend idempotency uses a UNIQUE constraint on `idempotency_key` to prevent duplicates.
- Filters and sorting are implemented via query parameters to the API and preserved by the frontend using `URLSearchParams`.

