import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const checkoutSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  telefono: z.string().min(9, 'Ingresa un número válido').max(12, 'Número muy largo'),
  direccion: z.string().min(10, 'Ingresa una dirección más completa'),
  referencia: z.string().optional(),
  distrito: z.string().min(3, 'Ingresa tu distrito'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, limpiarCarrito } = useCartStore()

  const totalPrecio = items.reduce(
    (acc, item) => acc + item.perfume.precio * item.cantidad, 0
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  })

  const numeroWhatsApp = '51928607104'

  const onSubmit = (data: CheckoutForm) => {
    const mensaje = encodeURIComponent(
      `🛍️ *Nuevo pedido — Perfumería Aura*\n\n` +
      `*Datos del cliente:*\n` +
      `Nombre: ${data.nombre}\n` +
      `Teléfono: ${data.telefono}\n` +
      `Distrito: ${data.distrito}\n` +
      `Dirección: ${data.direccion}\n` +
      `${data.referencia ? `Referencia: ${data.referencia}\n` : ''}` +
      `\n*Productos:*\n` +
      items.map((item) =>
        `▪️ ${item.perfume.nombre} (${item.perfume.marca}) x${item.cantidad} — S/ ${item.perfume.precio * item.cantidad}`
      ).join('\n') +
      `\n\n*Total: S/ ${totalPrecio}*\n` +
      `Modalidad: Contraentrega 🚚`
    )

    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank')
    limpiarCarrito()
    navigate('/')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-500">No tienes productos en el carrito</p>
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
      <div className="max-w-5xl mx-auto px-6 py-10">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-800 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al carrito
        </button>

        <h1 className="text-2xl font-serif text-neutral-800 mb-8">
          Confirmar pedido
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Formulario */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-neutral-800 mb-6">
              Tus datos de entrega
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

              {/* Nombre */}
              <div>
                <label className="text-sm text-neutral-600 mb-1 block">
                  Nombre completo
                </label>
                <input
                  {...register('nombre')}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                />
                {errors.nombre && (
                  <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="text-sm text-neutral-600 mb-1 block">
                  Teléfono / WhatsApp
                </label>
                <input
                  {...register('telefono')}
                  placeholder="Ej: 987654321"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                />
                {errors.telefono && (
                  <p className="text-red-400 text-xs mt-1">{errors.telefono.message}</p>
                )}
              </div>

              {/* Distrito */}
              <div>
                <label className="text-sm text-neutral-600 mb-1 block">
                  Distrito
                </label>
                <input
                  {...register('distrito')}
                  placeholder="Ej: Miraflores"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                />
                {errors.distrito && (
                  <p className="text-red-400 text-xs mt-1">{errors.distrito.message}</p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <label className="text-sm text-neutral-600 mb-1 block">
                  Dirección
                </label>
                <input
                  {...register('direccion')}
                  placeholder="Ej: Av. Larco 345, Dpto 201"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                />
                {errors.direccion && (
                  <p className="text-red-400 text-xs mt-1">{errors.direccion.message}</p>
                )}
              </div>

              {/* Referencia */}
              <div>
                <label className="text-sm text-neutral-600 mb-1 block">
                  Referencia <span className="text-neutral-400">(opcional)</span>
                </label>
                <input
                  {...register('referencia')}
                  placeholder="Ej: Frente al parque, casa azul"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors font-medium mt-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-5 h-5"
                />
                Confirmar y enviar por WhatsApp
              </button>

            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-medium text-neutral-800 mb-4">
                Resumen del pedido
              </h2>

              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.perfume.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-neutral-800">{item.perfume.nombre}</p>
                      <p className="text-xs text-neutral-400">{item.perfume.marca} × {item.cantidad}</p>
                    </div>
                    <p className="text-sm font-medium text-neutral-800">
                      S/ {item.perfume.precio * item.cantidad}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-100 mt-4 pt-4 flex justify-between items-center">
                <span className="text-neutral-600">Total</span>
                <span className="text-xl font-semibold text-neutral-900">
                  S/ {totalPrecio}
                </span>
              </div>

              <div className="mt-4 bg-neutral-50 rounded-xl p-3">
                <p className="text-xs text-neutral-500 text-center">
                  🚚 Modalidad: <strong>Contraentrega</strong> — pagas al recibir tu pedido
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage