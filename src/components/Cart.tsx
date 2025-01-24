import type React from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "../store/cartStore";
interface CartProps {
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
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">
            Your cart is empty
          </h3>
          <p className="text-gray-500">Add some services to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md ">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.service.id}
              className="flex items-center space-x-4 pb-6 border-b border-gray-100 last:border-0"
            >
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={item.service.image}
                  alt={item.service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.service.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.service.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.service.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.service.id, -1)}
                      className="p-1.5 rounded-md hover:bg-white hover:shadow-sm transition-all"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.service.id, 1)}
                      className="p-1.5 rounded-md hover:bg-white hover:shadow-sm transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    ${(item.service.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-lg">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service Fee</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-gray-800 pt-3 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={onCheckout}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
