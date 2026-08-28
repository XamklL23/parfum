import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Perfume } from '../types/perfume'

export interface CartItem {
  perfume: Perfume
  cantidad: number
}

interface CartStore {
  items: CartItem[]
  agregarAlCarrito: (perfume: Perfume) => void
  quitarDelCarrito: (id: string) => void
  restarDelCarrito: (id: string) => void
  limpiarCarrito: () => void
  totalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      agregarAlCarrito: (perfume) => {
        const items = get().items
        const existe = items.find((item) => item.perfume.id === perfume.id)

        if (existe) {
          set({
            items: items.map((item) =>
              item.perfume.id === perfume.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { perfume, cantidad: 1 }] })
        }
      },

      quitarDelCarrito: (id) => {
        set({ items: get().items.filter((item) => item.perfume.id !== id) })
      },

      restarDelCarrito: (id) => {
        const items = get().items
        const item = items.find((i) => i.perfume.id === id)

        if (!item) return

        if (item.cantidad === 1) {
          set({ items: items.filter((i) => i.perfume.id !== id) })
        } else {
          set({
            items: items.map((i) =>
              i.perfume.id === id
                ? { ...i, cantidad: i.cantidad - 1 }
                : i
            ),
          })
        }
      },

      limpiarCarrito: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.cantidad, 0),
    }),
    {
      name: 'carrito-perfumeria-aura',
    }
  )
)