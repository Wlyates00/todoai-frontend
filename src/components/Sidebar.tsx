import { useState, useEffect } from 'react'
import DarkModeToggle from './DarkModeToggle'
import { Link } from "react-router-dom"
import { useUser } from '../contexts/UserContext'

export default function Sidebar() {
  const user = useUser()

  const [open, setOpen] = useState(false)
  const [lists, setLists] = useState<{ id: number; name: string }[]>([])
  const [newList, setNewList] = useState('')

  function handleAddList(e: React.FormEvent) {
    e.preventDefault()
    if (newList.trim()) {
      setLists(prev => [...prev, { id: Date.now(), name: newList.trim() }])
      setNewList('')
    }
  }

  // Load lists from localStorage on mount
useEffect(() => {
  // I should load in from supabase here into localStorage?
  // Maybe just load in general

  const saved = localStorage.getItem("todo-projects")
  if (saved) {
    const parsed = JSON.parse(saved)
    console.log("Loaded projects:", parsed)
    setLists(parsed)
  } else {
    console.log("No projects found in storage")
  }
}, [])

    // Save lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todo-projects", JSON.stringify(lists))
    // I should save to supabase from local storage?
  }, [lists])

  return (
    <>
      {/* Mobile menu button */}
      {!open && <button
        className="absolute top-2 left-2 md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700 max-h-10 dark:text-white text-black hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
        onClick={() => setOpen(true)}
        aria-label="Toggle sidebar"
      >
        {/* Hamburger icon */}
        <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-100 dark:bg-gray-800 shadow-lg z-20
          transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="flex flex-row p-2">
            <h1 className="text-3xl dark:text-white text-black font-bold">Todo AI</h1>
            <button
              className="ml-auto md:hidden dark:text-white text-black p-2 pl-4 hover:text-gray-500 dark:hover:text-gray-500"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
              >X</button>
        </div>
        
        <div>
            <div className="pl-2 pb-1 font-bold text-lg text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-700">
            Todo Projects
            </div>
        </div>

        {/* Add List Form */}
        <form onSubmit={handleAddList} className="flex items-center p-2 border-b border-gray-300 dark:border-gray-700">
          <input
            className="flex-1 rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
            type="text"
            placeholder="New list"
            value={newList} // empty input
            onChange={e => setNewList(e.target.value)}
          />
          <button
            type="submit"
            className="px-2 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
          >
            +
          </button>
        </form>


        <ul className="p-2 space-y-2">
          {lists.map((list) => (
            <li key={list.id}>
              <Link
                to={`/project/${list.id}`}
                className="block text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-2 transition-colors"
              >
                {list.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-4 left-4">
          <DarkModeToggle />
        </div>
      </aside>
    </>
  )
}