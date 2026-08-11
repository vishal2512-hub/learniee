# Learniee

Learniee is a parent-focused course discovery platform built using React, Node.js and Express.

Parents can create an account, log in securely, browse available courses, and find suitable courses using search, filters, and sorting.

## Features

### Authentication
- Parent signup
- Parent login
- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only authentication cookies
- Protected dashboard
- Logout

### Course Discovery
- Browse available courses
- Search by course name or subject
- Filter by:
  - Grade
  - Subject
  - Price
  - Teacher rating
- Combine multiple filters
- Sort by price
- Sort by teacher rating
- Load More functionality
- No-results state

### UI
- Responsive dashboard
- Clean parent-friendly interface
- Loading states
- Error handling
- Responsive course cards

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Hooks

### Backend
- Node.js
- Express.js
- JWT
- bcrypt
- cookie-parser
- CORS
- dotenv

### Data Storage
For this assignment, local JSON files are used as permitted by the requirements.

```
server/data/
├── users.json
└── courses.json
```

## Project Structure

```
learniee/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── data/
│   │   ├── users.json
│   │   └── courses.json
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── courseRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Application Flow

```
Signup
   ↓
Login
   ↓
JWT Authentication
   ↓
Protected Dashboard
   ↓
Fetch Courses
   ↓
Search / Filter / Sort
   ↓
Load More
```

## Authentication Flow

**Signup:**
```
User Signup
    ↓
Validate input
    ↓
Check existing user
    ↓
Hash password using bcrypt
    ↓
Store user
    ↓
Create JWT
    ↓
Store JWT in HTTP-only cookie
```

**Login:**
```
User Login
    ↓
Find user by email
    ↓
Compare password using bcrypt
    ↓
Create JWT
    ↓
Set HTTP-only cookie
    ↓
Access protected dashboard
```

Passwords are never stored as plain text.

## Course Filtering

Courses are first fetched from the backend API. The React application then applies the selected search and filters.

**Example:**
```
Grade 9 + Science + Rating 4+
```

The filters are combinable, meaning every selected filter is applied to the current result set.

### Example Course Object

```json
{
  "id": 1,
  "title": "Foundations of Algebra",
  "subject": "Math",
  "grade": "Grade 6",
  "price": 1200,
  "teacherName": "Anita Sharma",
  "teacherRating": 4.6
}
```

## API Endpoints

### Authentication
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Courses
```
GET /api/courses
```

## Environment Variables

### Backend (`server/.env`)

```
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend (`client/.env`)

```
VITE_API_URL=http://localhost:5000/api
```

> Environment files should not be committed to GitHub.

## Local Setup

**1. Clone the repository**
```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd learniee
```

**2. Install backend dependencies**
```bash
cd server
npm install
```

**3. Start backend**
```bash
npm start
```

**4. Install frontend dependencies**

Open another terminal:
```bash
cd client
npm install
```

**5. Start frontend**
```bash
npm run dev
```

The application will run locally using the Vite development server.

## Deployment

The application is deployed using:

- **Frontend** → Vercel
- **Backend** → Render

Production environment variables should be configured directly in the hosting platforms (not committed to the repo).

**Production values:**

Render (backend):
```
NODE_ENV=production
CLIENT_URL=https://learniee-ogkt.vercel.app
JWT_SECRET=your_secret_key
```

Vercel (frontend):
```
VITE_API_URL=https://learniee.onrender.com/api
```

A `vercel.json` rewrite rule is required for client-side routing to work on page refresh / direct URL access:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Data Storage

Local JSON files are used because the assignment permits JSON or SQLite storage. For a production-scale application, a proper database such as PostgreSQL or MySQL would be recommended.

## Security

- Passwords are hashed using bcrypt
- JWT is used for authentication
- Authentication token is stored in an HTTP-only cookie
- Cookies use `secure: true` and `sameSite: "none"` in production for cross-domain auth
- Environment variables are used for secrets
- CORS is configured for the frontend origin

## Future Improvements

- PostgreSQL or MySQL database
- Course details page
- Parent-child profiles
- Course enrollment
- Payment integration
- Teacher profiles
- Admin dashboard
- Real pagination
- Course recommendations
- Email verification
- Password reset

---

Built by [Vishal Harsora](https://github.com/vishal2512-hub)
