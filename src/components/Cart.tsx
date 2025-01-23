import type React from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { CartItem } from "../types"; 

interface CartProps {
    items: CartItem[];  
    onUpdateQuantity: (serviceId: string, change: number) => void; 
    onRemoveItem: (serviceId: string) => void;  
    onCheckout: () => void;
  }

export function Cart({ onCheckout }: CartProps): React.ReactElement {
  const { items, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce(
    (sum, item) => sum + item.service.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-center text-gray-500 py-8">
          <ShoppingCart className="w-6 h-6 mr-2" />
          <span>Your cart is empty</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.service.id}
            className="flex items-center justify-between pb-4 border-b"
          >
            <div className="flex-1">
              <h3 className="font-medium">{item.service.name}</h3>
              <p className="text-sm text-gray-500">
                ${item.service.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateQuantity(item.service.id, -1)}
                className="p-1 rounded-md hover:bg-gray-100"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.service.id, 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeItem(item.service.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
