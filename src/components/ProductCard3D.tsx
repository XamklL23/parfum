import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import type { Perfume } from '../types/perfume'
import { useCartStore } from '../store/cartStore'

interface ProductCard3DProps {
  perfume: Perfume
}

function ProductCard3D({ perfume }: ProductCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const shine = shineRef.current
    if (!card || !shine) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
      card.style.transition = 'transform 0.1s ease-out'
      shine.style.opacity = '1'
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25) 0%, transparent 70%)`
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const shine = shineRef.current
    if (!card || !shine) return

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
      card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      shine.style.opacity = '0'
    })
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col cursor-pointer relative"
    >
      {/* Capa de brillo */}
      <div
        ref={shineRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          borderRadius: '1rem',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Imagen con flotación idle */}
      <Link to={`/producto/${perfume.id}`}>
        <div className="overflow-hidden rounded-t-2xl">
          <img
            src={perfume.imagen}
            alt={perfume.nombre}
            className="w-full h-64 object-cover"
            style={{
              animation: 'flotar 3.5s ease-in-out infinite',
              transformOrigin: 'center center',
            }}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          {perfume.marca}
        </p>
        <Link to={`/producto/${perfume.id}`}>
          <h3 className="text-lg font-serif text-neutral-800 mt-1 hover:text-neutral-600 transition-colors">
            {perfume.nombre}
          </h3>
        </Link>
        <p className="text-sm text-neutral-500 mt-2 line-clamp-2">
          {perfume.descripcion}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-semibold text-neutral-900">
            S/ {perfume.precio}
          </span>
          <span className="text-xs text-neutral-400">{perfume.ml}ml</span>
        </div>

        <button
          onClick={() => agregarAlCarrito(perfume)}
          className="mt-4 w-full bg-neutral-900 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors text-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard3D