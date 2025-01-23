import { create } from "zustand"
import type { CartItem, Service } from "../types"

interface CartStore {
  items: CartItem[]
  addItem: (service: Service) => void
  removeItem: (serviceId: string) => void
  updateQuantity: (serviceId: string, change: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (service: Service) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.service.id === service.id)
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.service.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }
      }
      return { items: [...state.items, { service, quantity: 1 }] }
    }),
  removeItem: (serviceId: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.service.id !== serviceId),
    })),
  updateQuantity: (serviceId: string, change: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.service.id === serviceId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}))
