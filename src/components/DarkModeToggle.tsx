import { useState } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  function handleToggle() {
    setDark((prev) => {
      if (!prev) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return !prev
    })
  }

  return (
    <button
      className="dark:text-white p-2 rounded-sm bg-gray-200 dark:bg-gray-700 text-black hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
      onClick={handleToggle}
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}