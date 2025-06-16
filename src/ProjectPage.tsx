import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import TaskPage from "./TaskPage"
import type { TodoList } from "./TaskPage"

export type Project = {
  id: string
  name: string
}

const ProjectPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState("")
  const [lists, setLists] = useState<TodoList[]>([])

  useEffect(() => {
    const storedProjects: Project[] = JSON.parse(localStorage.getItem("todo-projects") || "[]")
    const found = storedProjects.find((p: Project) => String(p.id) === id)

    if (found) {
      setProject(found)

      const savedProjectData = localStorage.getItem(`project-${found.id}`)
      if (savedProjectData) {
        const parsed = JSON.parse(savedProjectData)
        setNotes(parsed.notes || "")
        setLists(parsed.lists || []) 
      } else {
        setNotes("")
        setLists([])
      }
    } else {
      navigate("/404")
    }

    setLoading(false)
  }, [id, navigate])

  useEffect(() => {
    if (project) {
      const updated = {
        notes,
        lists,
      }
      localStorage.setItem(`project-${project.id}`, JSON.stringify(updated))
    }
  }, [notes, lists, project])

  if (loading) return <div>Loading...</div>

  return project ? (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-black dark:text-white">Project: {project.name}</h1>
        <textarea
          className="w-full max-w-[800px] mb-4 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white text-xs"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Important notes for this project..."
        />
      </div>
      <TaskPage
        notes={notes}
        setNotes={setNotes}
        lists={lists}
        setLists={setLists}
      />
    </div>
  ) : null
}

export default ProjectPage
