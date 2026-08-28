import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { perfumes } from '../data/perfumes'
import { useCartStore } from '../store/cartStore'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito)

  const perfume = perfumes.find((p) => p.id === id)

  if (!perfume) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-500">Perfume no encontrado</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-neutral-700 underline"
        >
          Volver al catálogo
        </button>
      </div>
    )
  }

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, estoy interesado en:\n\n` +
    `*${perfume.nombre}* — ${perfume.marca}\n` +
    `Precio: S/ ${perfume.precio}\n` +
    `Tamaño: ${perfume.ml}ml\n\n` +
    `¿Está disponible?`
  )

  const numeroWhatsApp = '51928607104'

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-800 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Imagen */}
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img
              src={perfume.imagen}
              alt={perfume.nombre}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-4">
            <p className="text-xs uppercase tracking-widest text-neutral-400">
              {perfume.marca}
            </p>
            <h1 className="text-3xl font-serif text-neutral-800">
              {perfume.nombre}
            </h1>
            <p className="text-neutral-500 leading-relaxed">
              {perfume.descripcion}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold text-neutral-900">
                S/ {perfume.precio}
              </span>
              <span className="text-sm text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
                {perfume.ml}ml
              </span>
              <span className="text-sm text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full capitalize">
                {perfume.categoria}
              </span>
            </div>

            {/* Stock */}
            <p className="text-sm text-neutral-400">
              {perfume.stock > 0
                ? `${perfume.stock} unidades disponibles`
                : 'Sin stock'}
            </p>

            {/* Botones */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => agregarAlCarrito(perfume)}
                className="w-full bg-neutral-900 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al carrito
              </button>

              <a
                href={`https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-5 h-5"
                />
                Consultar por WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductPage