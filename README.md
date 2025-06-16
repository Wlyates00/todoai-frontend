# TodoAI Frontend

A React-based frontend for TodoAI. It allows users to create and analyze todo items with a project based structure. This frontend connects to the [TodoAIAPI backend](https://github.com/Wlyates00/todoai-api).

## 🧱 Stack

-  **React** (with Vite)
-  **TypeScript**
-  **Tailwind CSS**
-  **LocalStorage** for persisting projects
-  **Supabase Authentication** for users to login/signup
-  **Fetch API** to call the backend

## 📁 Project Structure

```
├── index.html                     # Main HTML file served by Vite
├── package.json                   # Project metadata & dependencies
├── public/                        # Static assets (None yet)
├── tailwind.config.js             # Tailwind config (Not Required)
├── vite.config.ts                 # Vite configuration file (Plugins)
├── src/
│   ├── App.tsx                    # Root component with routes
│   ├── AuthPage.tsx               # Page to handle user authentication
│   ├── ProjectPage.tsx            # Main view for using TodoAI
│   ├── TaskPage.tsx               # Component for displaying task lists & cards
│   ├── components/
│   │   ├── DarkModeToggle.tsx     # Toggle for light & dark mode
│   │   ├── EditableTodoItem.tsx   # Editable task item component
│   │   ├── Sidebar.tsx            # Sidebar component for project navigation
│   │   └── Welcome.tsx            # Welcome page for shing info and login
│   ├── main.tsx                   # Application entry point
│   └── vite-env.d.ts              # Vite specific TypeScript definitions
└── package.json                   # (duplicate) - already listed above
```

## 🛠 Prerequisites

-  Node.js (v18 or later)
-  A running instance of the [TodoAIAPI backend](https://github.com/Wlyates00/todoai-api)

## 🚀 Installation & Running

1. **Clone the repo:**

```bash
git clone https://github.com/Wlyates00/todoai-frontend
cd todoai-frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the dev server:**

```bash
npm run dev
```

> The app will be hosted at `http://localhost:5173`.

## 🔗 Backend Connection

-  The frontend sends `POST` requests to `http://localhost:8080/create-todo`
-  Make sure your backend supports CORS from `http://localhost:5173`

## 💡 Features

Users can:

-  Create multiple todo projects
-  Add notes and task lists to each project
-  AI analysis of todo items via backend
-  Persistent state using LocalStorage

## 🧪 Testing

You can use your browser or DevTools to test functionality. For full testing, make sure the backend is running and accessible.
