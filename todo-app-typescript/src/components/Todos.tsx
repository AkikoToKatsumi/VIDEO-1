// Importa el componente `Todo` y el tipo `TodoType`
import { Todo } from './Todo'
import type { Todo as TodoType } from '../types'

// Importa `useState` para manejar el estado y `useAutoAnimate` para animaciones
import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// Define las propiedades esperadas por el componente `Todos`
interface Props {
  todos: TodoType[] // Lista de tareas
  setCompleted: (id: string, completed: boolean) => void // Función para cambiar estado de completado
  setTitle: (params: Omit<TodoType, 'completed'>) => void // Función para actualizar el título de la tarea
  removeTodo: (id: string) => void // Función para eliminar una tarea
}

// Componente `Todos` que gestiona y muestra la lista de tareas
export const Todos: React.FC<Props> = ({
  todos,
  setCompleted,
  setTitle,
  removeTodo
}) => {
  // Estado para manejar qué tarea está en modo edición
  const [isEditing, setIsEditing] = useState('')

  // Hook para animaciones automáticas en la lista de tareas
  const [parent] = useAutoAnimate()

  return (
    // Lista de tareas con animaciones aplicadas
    <ul className='todo-list' ref={parent}>
      {/* Itera sobre la lista de tareas y renderiza cada una */}
      {todos?.map((todo) => (
        <li
          key={todo.id} // Clave única para React
          onDoubleClick={() => { setIsEditing(todo.id) }} // Activa el modo edición al hacer doble clic
          className={`
            ${todo.completed ? 'completed' : ''} // Clase si la tarea está completada
            ${isEditing === todo.id ? 'editing' : ''} // Clase si la tarea está en edición
          `}
        >
          {/* Renderiza el componente `Todo` */}
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            setCompleted={setCompleted}
            setTitle={setTitle}
            removeTodo={removeTodo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}
