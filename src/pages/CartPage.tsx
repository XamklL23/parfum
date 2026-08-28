import { useNavigate } from 'react-router-dom'
import { Trash2, ArrowLeft, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

function CartPage() {
  const navigate = useNavigate()
  const { items, quitarDelCarrito, limpiarCarrito, agregarAlCarrito, restarDelCarrito } = useCartStore()

  const totalPrecio = items.reduce(
    (acc, item) => acc + item.perfume.precio * item.cantidad, 0
  )

  const numeroWhatsApp = '51928607104'

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, quiero hacer este pedido:\n\n` +
    items.map((item) =>
      `${item.perfume.nombre} (${item.perfume.marca}) x${item.cantidad} — S/ ${item.perfume.precio * item.cantidad}`
    ).join('\n') +
    `\n\n*Total: S/ ${totalPrecio}*\n\n¿Pueden confirmar disponibilidad?`
  )

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-4">
        <ShoppingCart className="w-12 h-12 text-neutral-300" />
        <p className="text-neutral-500">Tu carrito está vacío</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm bg-neutral-900 text-white px-6 py-2 rounded-xl hover:bg-neutral-700 transition-colors"
        >
          Ver catálogo
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-800 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <h1 className="text-2xl font-serif text-neutral-800 mb-6">
          Tu carrito
        </h1>

        {/* Lista de productos */}
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.perfume.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center">

              <img
                src={item.perfume.imagen}
                alt={item.perfume.nombre}
                className="w-20 h-20 object-cover rounded-xl"
              />

              <div className="flex-1">
                <p className="text-xs text-neutral-400 uppercase tracking-wide">
                  {item.perfume.marca}
                </p>
                <p className="text-neutral-800 font-medium">
                  {item.perfume.nombre}
                </p>
                <p className="text-neutral-500 text-sm">
                  S/ {item.perfume.precio} c/u
                </p>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center gap-2">
                <button
                    onClick={() => restarDelCarrito(item.perfume.id)}
                    className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
                >
                    −
                </button>
                <span className="w-6 text-center text-neutral-800 font-medium">
                  {item.cantidad}
                </span>
                <button
                  onClick={() => agregarAlCarrito(item.perfume)}
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-neutral-800 font-semibold w-16 text-right">
                S/ {item.perfume.precio * item.cantidad}
              </p>

              {/* Eliminar */}
              <button
                onClick={() => quitarDelCarrito(item.perfume.id)}
                className="text-neutral-300 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

        {/* Resumen total */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <span className="text-neutral-600">Total del pedido</span>
            <span className="text-2xl font-semibold text-neutral-900">
              S/ {totalPrecio}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={limpiarCarrito}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors font-medium"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
              Enviar pedido por WhatsApp
            </a>
            <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-neutral-900 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors font-medium"
            >
                Proceder al checkout
            </button>
            <button
              onClick={limpiarCarrito}
              className="w-full text-neutral-400 hover:text-neutral-600 transition-colors text-sm py-2 bg-neutral-150 border-1 font-bold rounded-xl"
            >
              Vaciar carrito
            </button>
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartPage