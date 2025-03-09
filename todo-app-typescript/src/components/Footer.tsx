// Importa el tipo `FilterValue` desde '../types' para definir los tipos de las props
import { type FilterValue } from '../types'
// Importa el componente `Filters` que se usará dentro de este componente
import { Filters } from './Filters'

// Define las propiedades esperadas por el componente `Footer`
interface Props {
  handleFilterChange: (filter: FilterValue) => void // Función para cambiar el filtro de tareas
  activeCount: number // Número de tareas pendientes
  completedCount: number // Número de tareas completadas
  onClearCompleted: () => void // Función para borrar las tareas completadas
  filterSelected: FilterValue // Filtro actualmente seleccionado
}

// Define el componente `Footer`, que recibe las props definidas anteriormente
export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  onClearCompleted,
  filterSelected,
  handleFilterChange
}) => {
  // Determina si hay exactamente una tarea pendiente para ajustar el texto
  const singleActiveCount = activeCount === 1
  const activeTodoWord = singleActiveCount ? 'tarea' : 'tareas' // Plural o singular según el caso

  return (
    <footer className="footer">
      {/* Muestra el número de tareas pendientes con el texto adecuado */}
      <span className="todo-count">
        <strong>{activeCount}</strong> {activeTodoWord} Pendientes{!singleActiveCount && 's'}
      </span>

      {/* Renderiza los filtros para seleccionar entre todas, activas o completadas */}
      <Filters filterSelected={filterSelected} handleFilterChange={handleFilterChange} />

      {/* Si hay tareas completadas, muestra un botón para borrarlas */}
      {
        completedCount > 0 && (
          <button
            className="clear-completed"
            onClick={onClearCompleted}>
              Borrar tareas ya hechas 
          </button>
        )
      }
    </footer>
  )
}
