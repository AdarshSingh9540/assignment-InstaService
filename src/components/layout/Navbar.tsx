import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  cartItemsCount: number;
}

export function Navbar({ cartItemsCount }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 hover:text-blue-700"
          >
            InstaService
          </Link>
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
