// Importa `useState` para manejar estados y constantes relacionadas con los filtros
import { useState } from 'react'
import { TODO_FILTERS } from '../consts'
import { mockTodos } from '../mocks/todos'
import { type TodoList, type FilterValue } from '../types'

// Hook personalizado `useTodos` para manejar la lógica de tareas
export const useTodos = (): {
  activeCount: number
  completedCount: number
  todos: TodoList
  filterSelected: FilterValue | undefined
  handleClearCompleted: () => void
  handleCompleted: (id: string, completed: boolean) => void
  handleFilterChange: (filter: FilterValue) => void
  handleRemove: (id: string) => void
  handleSave: (title: string) => void
  handleUpdateTitle: (params: { id: string, title: string }) => void
} => {
  // Estado para la lista de tareas, inicializado con datos de prueba
  const [todos, setTodos] = useState(mockTodos)

  // Estado para el filtro seleccionado (puede ser activo, completado o todos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>()

  // Función para marcar o desmarcar una tarea como completada
  const handleCompleted = (id: string, completed: boolean): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed }
      }
      return todo
    })
    setTodos(newTodos)
  }

  // Función para eliminar una tarea por su ID
  const handleRemove = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  // Función para actualizar el título de una tarea
  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title }
      }
      return todo
    })
    setTodos(newTodos)
  }

  // Función para agregar una nueva tarea
  const handleSave = (title: string): void => {
    const newTodo = {
      id: crypto.randomUUID(), // Genera un ID único
      title,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  // Función para eliminar todas las tareas completadas
  const handleClearCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  // Filtra las tareas según el filtro seleccionado
  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return true // Si no hay filtro, muestra todas
  })

  // Función para cambiar el filtro y actualizar la URL con el nuevo estado
  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  // Contador de tareas completadas y activas
  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  // Retorna los estados y funciones necesarias para manejar las tareas
  return {
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleCompleted,
    handleFilterChange,
    handleRemove,
    handleSave,
    handleUpdateTitle,
    todos: filteredTodos
  }
}
