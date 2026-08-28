import { useState } from 'react'
import { Search } from 'lucide-react'
import { perfumes } from '../data/perfumes'
import ProductCard3D from '../components/ProductCard3D'
import type { Perfume } from '../types/perfume'

type Categoria = Perfume['categoria'] | 'todas'

function HomePage() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>('todas')

  const categorias: Categoria[] = ['todas', 'floral', 'amaderado', 'citrico', 'oriental']

  const perfumesFiltrados = perfumes.filter((perfume) => {
    const coincideBusqueda =
      perfume.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      perfume.marca.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria =
      categoriaActiva === 'todas' || perfume.categoria === categoriaActiva
    return coincideBusqueda && coincideCategoria
  })

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-6xl mx-auto px-6 pb-16 pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-neutral-800">Nuestras Fragancias</h2>
          <p className="text-neutral-500 text-sm mt-1">
            {perfumesFiltrados.length} productos encontrados
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o marca..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors"
          />
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${
                categoriaActiva === categoria
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {perfumesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perfumesFiltrados.map((perfume) => (
              <ProductCard3D key={perfume.id} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-neutral-400 text-lg">No se encontraron perfumes</p>
            <button
              onClick={() => { setBusqueda(''); setCategoriaActiva('todas') }}
              className="text-sm text-neutral-500 underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage