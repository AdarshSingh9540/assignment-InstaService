
import { useNavigate } from "react-router-dom"
import { Cart } from "../components/Cart";
import { ShoppingBag } from "lucide-react";

export function CartPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 my-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        <Cart onCheckout={() => navigate("/checkout")} />
      </div>
    </div>
  );
}
