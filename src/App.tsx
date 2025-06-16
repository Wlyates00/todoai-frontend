import './App.css'
import Sidebar from './components/Sidebar'
import Welcome from './components/Welcome'
//import { useUser } from './contexts/UserContext'
import AuthPage from './AuthPage'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Task from './TaskPage'
import ProjectPage from './ProjectPage'

function AppContent() {
  const location = useLocation()
  // List all routes where you want to hide the sidebar
  const sidebarHiddenRoutes = ['/login', '/register', '/some-other-page']
  const hideSidebar = sidebarHiddenRoutes.includes(location.pathname)

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {!hideSidebar && <Sidebar />}
      <main className="w-full h-screen transition-all duration-200">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </div>
  )
}

// Wrapping the entire app so i can check location and conditionally render the sidebar
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App