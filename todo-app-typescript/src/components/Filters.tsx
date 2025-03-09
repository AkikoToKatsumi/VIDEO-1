// Importa las constantes de filtros desde el archivo '../consts.js'
import { TODO_FILTERS } from '../consts.js'
// Importa el tipo `FilterValue` desde '../types.js' para usarlo en las funciones
import { type FilterValue } from '../types.js'

// Define un objeto `FILTERS_BUTTONS` que mapea cada tipo de filtro con su correspondiente
// texto y URL. Se usa `as const` para asegurar que las propiedades sean de solo lectura.
const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: { literal: 'All', href: `/?filter=${TODO_FILTERS.ALL}` },
  [TODO_FILTERS.ACTIVE]: { literal: 'Active', href: `/?filter=${TODO_FILTERS.ACTIVE}` },
  [TODO_FILTERS.COMPLETED]: { literal: 'Completed', href: `/?filter=${TODO_FILTERS.COMPLETED}` }
} as const

// Define las propiedades esperadas por el componente `Filters`
interface Props {
  handleFilterChange: (filter: FilterValue) => void // Función para cambiar el filtro
  filterSelected: typeof TODO_FILTERS[keyof typeof TODO_FILTERS] // Filtro actualmente seleccionado
}

// Define el componente `Filters` que recibe `filterSelected` y `handleFilterChange` como props
export const Filters: React.FC<Props> = ({ filterSelected, handleFilterChange }) => {
  // Función que maneja el clic en un filtro. Evita la navegación por defecto y cambia el filtro.
  const handleClick = (filter: FilterValue) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    handleFilterChange(filter) // Llama a la función pasada como prop para cambiar el filtro
  }

  return (
    <ul className="filters">
      {
        // Convierte el objeto `FILTERS_BUTTONS` en una lista de elementos `<li>` con enlaces `<a>`
        Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = key === filterSelected // Verifica si el filtro está seleccionado
          const className = isSelected ? 'selected' : '' // Agrega la clase 'selected' si está activo

          return (
            <li key={key}>
              <a href={href}
                className={className}
                onClick={handleClick(key as FilterValue)}>{literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
