// import type { Perfume } from "../types/perfume";

// //CREAMOS UNA NUEVA VARIABLE DONDE ALMACENAREMOS LOS DATOS OBTENIDOS DENTRO DEL MISMO perfumes.ts
// //PERO ESTA VEZ EL INTERFACE QUE SE UTILIZA ACÁ ES DE MANERA LOCAL POR LO QUE NO SE PUEDE UTILIZAR EN OTROS ARCHIVOS

// interface ProductCardProps{
//     perfume: Perfume
// }

// //ACÁ YA ARMAMOS PARTE DEL COMPONENTE QUE USAREMOS PARA LA PAGINA GENERALMENTE
// //ACÁ SE MODELA PARTE DE LAS TARJETAS DE CADA PRODUCTO QUE SE MOSTRARÁ
// function ProductCard({ perfume } : ProductCardProps){
//     return (
//         <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//             <img
//                 src={perfume.imagen}
//                 alt={perfume.nombre}
//                 className="w-full h-64 object-cover"
//             />
//             <div className="p-4">
//                 <p className="text-xs uppercase tracking-wide text-neutral-400">
//                     {perfume.marca}
//                 </p>
//                 <h3 className="text-lg font-serif text-neutral-800 mt-1">
//                     {perfume.nombre}
//                 </h3>
//                 <p className="text-sm text-neutral-500 mt-2 line-clamp-2">
//                     {perfume.descripcion}
//                 </p>
//                 <div className="flex items-center justify-between mt-4">
//                     <span className="text-xl font-semibold text-neutral-900">
//                         S/ {perfume.precio}
//                     </span>
//                     <span className="text-xs text-neutral-400">{perfume.ml}ml</span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductCard


import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import type { Perfume } from '../types/perfume'
import { useCartStore } from '../store/cartStore'

interface ProductCardProps {
  perfume: Perfume
}

function ProductCard({ perfume }: ProductCardProps) {
  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito)

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <Link to={`/producto/${perfume.id}`}>
        <img
          src={perfume.imagen}
          alt={perfume.nombre}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

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

export default ProductCard