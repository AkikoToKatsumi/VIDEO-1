// Importa los hooks de React para manejar el estado, efectos y referencias
import { useEffect, useRef, useState } from 'react'

// Define las propiedades esperadas por el componente `Todo`
interface Props {
  id: string // Identificador único de la tarea
  title: string // Título de la tarea
  completed: boolean // Indica si la tarea está completada o no
  setCompleted: (id: string, completed: boolean) => void // Función para cambiar el estado de completado
  setTitle: (params: { id: string, title: string }) => void // Función para actualizar el título de la tarea
  isEditing: string // Indica si la tarea está en modo edición
  setIsEditing: (completed: string) => void // Función para activar o desactivar el modo edición
  removeTodo: (id: string) => void // Función para eliminar la tarea
}

// Define el componente `Todo`
export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  setCompleted,
  setTitle,
  removeTodo,
  isEditing,
  setIsEditing
}) => {
  // Estado local para manejar el título editado de la tarea
  const [editedTitle, setEditedTitle] = useState(title)

  // Referencia al input de edición para enfocarlo automáticamente
  const inputEditTitle = useRef<HTMLInputElement>(null)

  // Maneja la lógica de edición cuando el usuario presiona Enter o Escape
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') { // Si presiona "Enter"
      setEditedTitle(editedTitle.trim()) // Elimina espacios en blanco extra

      if (editedTitle !== title) { // Si el título cambió, lo actualiza
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') removeTodo(id) // Si está vacío, elimina la tarea

      setIsEditing('') // Sale del modo edición
    }

    if (e.key === 'Escape') { // Si presiona "Escape"
      setEditedTitle(title) // Restaura el título original
      setIsEditing('') // Sale del modo edición
    }
  }

  // Cuando el modo edición se activa, enfoca automáticamente el input
  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className='view'>
        {/* Checkbox para marcar o desmarcar la tarea como completada */}
        <input
          className='toggle'
          checked={completed}
          type='checkbox'
          onChange={(e) => { setCompleted(id, e.target.checked) }}
        />
        {/* Muestra el título de la tarea */}
        <label>{title}</label>
        {/* Botón para eliminar la tarea */}
        <button className='destroy' onClick={() => { removeTodo(id) }}></button>
      </div>

      {/* Input para editar el título de la tarea cuando está en modo edición */}
      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown} // Maneja la edición con el teclado
        onBlur={() => { setIsEditing('') }} // Sale del modo edición si se pierde el foco
        ref={inputEditTitle} // Asigna la referencia para enfocar el input automáticamente
      />
    </>
  )
}
