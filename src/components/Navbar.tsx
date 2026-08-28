
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '../store/cartStore'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems())
  const location = useLocation()

  const links = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' },
  ]

  const esActivo = (path: string) => location.pathname === path

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-serif text-neutral-800">
          Perfumería Aura
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${
                esActivo(link.path)
                  ? 'text-neutral-900 font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Carrito + hamburguesa */}
        <div className="flex items-center gap-4">
          {/* Ícono carrito */}
          <Link to="/carrito" className="relative">
            <ShoppingCart className="w-6 h-6 text-neutral-700" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Botón hamburguesa (solo mobile) */}
          <button
            className="md:hidden text-neutral-700"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="text-2xl">{menuAbierto ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {menuAbierto && (
        <div className="md:hidden border-t border-neutral-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm ${
                esActivo(link.path)
                  ? 'text-neutral-900 font-semibold'
                  : 'text-neutral-500'
              }`}
              onClick={() => setMenuAbierto(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar