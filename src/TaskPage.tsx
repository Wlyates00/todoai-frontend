import { useState, useRef } from "react"
import EditableTodoItem from "./components/EditableTodoItem";

// Need to add a description string and a completed bool
type Todo = { id: number; text: string; description: string, completed: boolean}
// Needed coordinates here to display where I wanted
// Eventually i need to mod the coords with screen width to prevent lists off screen
// Need to add important notes for each list (These are notes that will be carried over into each analyzation)
export type TodoList = { id: number; name: string; todos: Todo[]; notes: string; x: number; y: number }

// Todolist will bedisplayed in a card manner
function TaskCard({
  list,
  onAddTodo,
  onToggleComplete,
  onEditTodo,
  onDeleteTodo,
  onDeleteList,
  onDrag,
}: {
  // Types for my props
  list: TodoList
  onAddTodo: (listId: number, text: string, description: string) => void
  onToggleComplete: (listid: number, todoid: number) => void
  onEditTodo: (listid: number, todoid: number, text: string, description: string) => void
  onDeleteTodo: (listId: number, todoId: number) => void
  onDeleteList: (listId: number) => void
  onDrag: (listId: number, x: number, y: number) => void
}) {
  const [newTodo, setNewTodo] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const cardRef = useRef<HTMLDivElement | null>(null)
  const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [openTodoId, setOpenTodoId] = useState<number | null>(null);

  // Drag logic
  const handlePointerDown = (e: React.PointerEvent) => {
    const card = cardRef.current
    if (!card) return
    card.setPointerCapture(e.pointerId)
    offset.current = {
      x: e.clientX - list.x,
      y: e.clientY - list.y,
    }
    card.onpointermove = (ev) => {
      onDrag(list.id, ev.clientX - offset.current.x, ev.clientY - offset.current.y)
    }
    card.onpointerup = () => {
      card.onpointermove = null
      card.onpointerup = null
    }
  }

  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        left: list.x,
        top: list.y,
        width: 300,
        zIndex: 10,
      }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col"
    >
      {/* Drag handle/header */}
      <div
        className="flex items-center justify-between mb-2 cursor-grab select-none"
        style={{ userSelect: "none" }}
        onPointerDown={handlePointerDown}
      >
        <h2 className="text-lg font-bold dark:text-white max-w-48 whitespace-normal break-words">{list.name}</h2>
        <button
          className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
          onClick={() => onDeleteList(list.id)}
        >
          Delete List
        </button>
      </div>
      <ul className="mb-2">
        {list.todos.map((todo) => (
          <EditableTodoItem
            key={todo.id}
            todo={todo}
            listId={list.id}
            onToggleComplete={onToggleComplete}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
            openTodoId={openTodoId}
            setOpenTodoId={setOpenTodoId}
          />
        ))}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (newTodo.trim()) {
            onAddTodo(list.id, newTodo.trim(), newDesc.trim())
            setNewTodo("")
            setNewDesc("")
          }
        }}
        className="flex flex-col gap-2"
      >
        <input
          className="px-2 py-1 border-b border-gray-500 dark:text-white"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Task title"
        />
        <input
          className="px-2 py-1 border-b border-gray-500 dark:text-white"
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
          placeholder="Description"
        />
        <button type="submit" className="px-2 py-1 rounded bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition">
          Add
        </button>
      </form>
    </div>
  )
}

type Props = {
  notes: string
  setNotes: (value: string) => void
  lists: TodoList[]
  setLists: React.Dispatch<React.SetStateAction<TodoList[]>>
}

function TaskPage({ notes, lists, setLists }: Props) {
  const [newListName, setNewListName] = useState("")

  console.log(notes)

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault()
    if (newListName.trim()) {
      const newList: TodoList = {
        id: Date.now(),
        name: newListName.trim(),
        todos: [],
        notes: "",
        x: 100 + Math.random() * 400,
        y: 100 + Math.random() * 200,
      }
      setLists(prev => [...prev, newList])
      setNewListName("")
    }
  }

  const handleAddTodo = (listId: number, text: string, description: string) => {
    setLists(lists =>
      lists.map(list =>
        list.id === listId
          ? {
              ...list,
              todos: [...list.todos, { id: Date.now(), text, description, completed: false }],
            }
          : list
      )
    )
  }

  const handleDeleteTodo = (listId: number, todoId: number) => {
    setLists(lists =>
      lists.map(list =>
        list.id === listId
          ? { ...list, todos: list.todos.filter(todo => todo.id !== todoId) }
          : list
      )
    )
  }

  const handleToggleComplete = (listId: number, todoId: number) => {
    setLists(lists =>
      lists.map(list =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
              ),
            }
          : list
      )
    )
  }

  const handleEditTodo = (listId: number, todoId: number, text: string, description: string) => {
    setLists(lists =>
      lists.map(list =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map(todo =>
                todo.id === todoId ? { ...todo, text, description } : todo
              ),
            }
          : list
      )
    )
  }

  const handleDeleteList = (id: number) => {
    setLists(lists => lists.filter(list => list.id !== id))
  }

  const handleDrag = (listId: number, x: number, y: number) => {
    setLists(lists =>
      lists.map(list =>
        list.id === listId ? { ...list, x, y } : list
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 relative">
      <form onSubmit={handleAddList} className="flex gap-2 mb-6 justify-center">
        <input
          className="flex-1 max-w-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
          value={newListName}
          onChange={e => setNewListName(e.target.value)}
          placeholder="Add a new list"
        />
        <button
          type="submit"
          className="px-4 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Add List
        </button>
      </form>

      <div className="relative" style={{ minHeight: "70vh" }}>
        {lists.map(list => (
          <TaskCard
            key={list.id}
            list={list}
            onAddTodo={handleAddTodo}
            onToggleComplete={handleToggleComplete}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
            onDeleteList={handleDeleteList}
            onDrag={handleDrag}
          />
        ))}
      </div>
    </div>
  )
}


export default TaskPage