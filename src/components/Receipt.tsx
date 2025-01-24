import { useNavigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import type { Receipt as ReceiptType } from "../types";

export function Receipt() {
  const navigate = useNavigate();
  const { receiptId } = useParams();
  const { items } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.service.price * item.quantity,
    0
  );

  const receipt: ReceiptType = {
    id: receiptId || "",
    customer: JSON.parse(localStorage.getItem("customerInfo") || "{}"),
    items: items,
    total: total,
    date: new Date().toISOString(),
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-8">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
        <p className="text-gray-600">Your order has been confirmed</p>
      </div>

      <div className="border-t border-b py-4 mb-4">
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Customer Details</h3>
          <p className="text-gray-600">{receipt.customer.name}</p>
          <p className="text-gray-600">{receipt.customer.email}</p>
          <p className="text-gray-600">{receipt.customer.phone}</p>
          <p className="text-gray-600">{receipt.customer.billingAddress}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Details</h3>
          {receipt.items.map((item) => (
            <div
              key={item.service.id}
              className="flex justify-between text-gray-600 mb-1"
            >
              <span>
                {item.service.name} x{item.quantity}
              </span>
              <span>${(item.service.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-lg font-semibold mb-6">
        <span>Total</span>
        <span>${receipt.total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Services
      </button>
    </div>
  );
}
