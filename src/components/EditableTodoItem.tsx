import React, { useState } from "react"

type Todo = {
  id: number
  text: string
  description: string
  completed: boolean
}

type AiResult = {
  difficulty: string
  time_estimate: string
  priority: string
  steps: string
  tips: string
  error: string
}

interface EditableTodoItemProps {
  todo: Todo
  listId: number
  onToggleComplete: (listId: number, todoId: number) => void
  onDeleteTodo: (listId: number, todoId: number) => void
  onEditTodo: (listId: number, todoId: number, text: string, description: string) => void
  openTodoId: number | null
  setOpenTodoId: (id: number | null) => void
}

const EditableTodoItem: React.FC<EditableTodoItemProps> = ({
  todo,
  listId,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
  openTodoId,
  setOpenTodoId
}) => {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editDesc, setEditDesc] = useState(todo.description)

  const [aiResult, setAiResult] = useState<AiResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const [error, setError] = useState("")

  const handleSave = () => {
    onEditTodo(listId, todo.id, editText, editDesc)
    setEditing(false)
  }

  const handleAnalyze = async () => {
    setOpenTodoId(todo.id) // close others, open this one
    setLoading(true)
    setShowResult(true)
    setAiResult(null)
    try {
      const response = await fetch("http://localhost:8080/create-todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: todo.id,
          title: todo.text,
          description: todo.description,
          done: todo.completed
        }),
      })
      const data = await response.json()
      setAiResult(data)
    } catch (err) {
      setError("Error getting analysis.")
      setAiResult({
        difficulty: "",
        time_estimate: "",
        priority: "",
        steps: "",
        tips: "",
        error: "Error getting analysis."
      })
      setOpenTodoId(todo.id); // open current one
    }
    setLoading(false)
  }

  const isEmptyResult = !aiResult || (!aiResult.difficulty && !aiResult.time_estimate && !aiResult.priority && !aiResult.steps && !aiResult.tips);


  return (
    <li className="flex flex-col py-1 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(listId, todo.id)}
          className="mr-2"
        />
        {editing ? (
          <>
            <input
              className="flex-1 px-1 py-0.5 rounded border text-black dark:border-white dark:text-white max-w-42"
              value={editText}
              onChange={e => setEditText(e.target.value)}
            />
            <button className="ml-2 text-xs text-green-600 hover:underline" onClick={handleSave}>Save</button>
            <button className="ml-2 text-xs text-gray-500 hover:underline" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <span
              className={`flex-1 text-sm text-gray-800 dark:text-gray-100 w-42 whitespace-normal break-words ${todo.completed ? "line-through" : ""}`}
              onDoubleClick={() => setEditing(true)}
              title="Double-click to edit"
            >
              {todo.text}
            </span>
            <button
              className="ml-2 text-xs text-blue-500 hover:underline"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="ml-2 text-xs text-red-500 hover:underline"
              onClick={() => onDeleteTodo(listId, todo.id)}
            >
              Delete
            </button>
            <button
              className="ml-2 text-xs text-green-600 hover:underline"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </>
        )}
      </div>
      {editing ? (
        <input
          className="mt-1 px-1 py-0.5 rounded border text-black dark:border-white dark:text-white w-54 ml-5"
          value={editDesc}
          onChange={e => setEditDesc(e.target.value)}
          placeholder="Description"
        />
      ) : (
        <span className="text-xs text-gray-500 dark:text-gray-300 ml-6 w-42 whitespace-normal break-words">{todo.description}</span>
      )}
      <div className="w-full">
      {aiResult && <button
        className="text-xs text-indigo-700 dark:text-indigo-300 hover:underline"
        onClick={() =>
          openTodoId === todo.id ? setOpenTodoId(null) : setOpenTodoId(todo.id)
        }
      >
        {openTodoId === todo.id ? "Hide Analysis" : "Show Analysis"}
      </button>}
      </div>
      {showResult && openTodoId === todo.id && (
        <div className="absolute left-full top-0 ml-4 w-80 bg-gray-100 dark:bg-gray-800 rounded p-3 shadow z-20 max-h-[250px] overflow-y-auto dark:text-white">
          <div className="font-semibold mb-1 text-indigo-500">AI Analysis</div>

          {loading && <div>Analyzing...</div>}

          {!isEmptyResult && !aiResult.error && (
            <div className="text-sm whitespace-pre-wrap">
              <div><b>Difficulty:</b> {aiResult.difficulty}</div>
              <div><b>Time Estimate:</b> {aiResult.time_estimate}</div>
              <div><b>Priority:</b> {aiResult.priority}</div>
              <div className="mt-2"><b>Steps:</b>
                <pre className="whitespace-pre-wrap">{aiResult.steps}</pre>
              </div>
              <div className="mt-2"><b>Tips:</b>
                <div>{aiResult.tips}</div>
              </div>
            </div>
          )}

          {!loading && isEmptyResult && (
            <div className="text-sm text-gray-500 italic">No analysis returned.</div>
          )}

          {aiResult && aiResult.error && (
            <div className="text-red-500">{error}</div>
          )}
        </div>
      )}
    </li>
  )
}

export default EditableTodoItem