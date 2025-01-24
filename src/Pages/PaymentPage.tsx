import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { CreditCard, Smartphone, DollarSign, Shield } from "lucide-react";

export function PaymentPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + item.service.price * item.quantity,
    0
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) return;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart(); // Clear the cart after payment is processed
    setIsProcessing(false);
    navigate("/receipt"); // Navigate directly to the receipt page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Secure Payment
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setSelectedMethod("card")}
                className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-all ${
                  selectedMethod === "card"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <CreditCard
                  className={`w-6 h-6 ${
                    selectedMethod === "card"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                />
                <span className="text-sm font-medium">Card Payment</span>
              </button>

              <button
                onClick={() => setSelectedMethod("upi")}
                className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-all ${
                  selectedMethod === "upi"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <Smartphone
                  className={`w-6 h-6 ${
                    selectedMethod === "upi" ? "text-blue-500" : "text-gray-500"
                  }`}
                />
                <span className="text-sm font-medium">UPI</span>
              </button>

              <button
                onClick={() => setSelectedMethod("cod")}
                className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-all ${
                  selectedMethod === "cod"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <DollarSign
                  className={`w-6 h-6 ${
                    selectedMethod === "cod" ? "text-blue-500" : "text-gray-500"
                  }`}
                />
                <span className="text-sm font-medium">Cash on Delivery</span>
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              {selectedMethod === "card" && (
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              )}

              {selectedMethod === "upi" && (
                <div>
                  <label
                    htmlFor="upiId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    UPI ID
                  </label>
                  <input
                    type="text"
                    id="upiId"
                    placeholder="username@upi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              )}

              {selectedMethod === "cod" && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Pay with cash upon service delivery. Our service provider
                    will collect the payment.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-800 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay $${total.toFixed(2)}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
